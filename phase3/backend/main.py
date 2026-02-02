from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid
import os
from datetime import datetime
from cohere import Client as CohereClient
from sqlmodel import Session, select

from db import create_db_and_tables, test_connection
from models import Message, Conversation, MessageRoleEnum, Task, User
from tools import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
    get_conversation_history,
    add_message_to_conversation
)

import os
from dotenv import load_dotenv

load_dotenv()


# Lifespan context manager for startup events
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n" + "="*50)
    print("🚀 Starting Todo API - Phase II with AI Backend")

    # Test Connection
    if test_connection():
        print("✅ Database connection verified")
        # Create Tables
        create_db_and_tables()
    else:
        print("❌ Database connection failed!")

    print("="*50 + "\n")
    yield


app = FastAPI(
    title="Todo API - Phase II with AI Backend",
    version="2.0.0",
    lifespan=lifespan
)


# CORS Configuration - Fixed for Frontend Access
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specific origins are safer/better than "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response models
class ChatRequest(BaseModel):
    message: str
    user_id: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: datetime


def get_cohere_client():
    api_key = os.getenv("COHERE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Cohere API key not configured")
    return CohereClient(api_key=api_key)


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    cohere_client: CohereClient = Depends(get_cohere_client),
    session: Session = Depends(lambda: next(get_session()))
):
    """
    Main chat endpoint that handles user messages and responds using Cohere AI.
    Integrates with MCP tools for task operations.
    """
    try:
        # If no conversation_id is provided, create a new conversation
        if not request.conversation_id:
            conversation_id = str(uuid.uuid4())

            # Create new conversation record
            new_conversation = Conversation(
                id=conversation_id,
                user_id=request.user_id,
                title=f"Conversation {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            )
            session.add(new_conversation)
            session.commit()
        else:
            conversation_id = request.conversation_id

            # Verify conversation exists and belongs to user
            existing_conv = session.exec(
                select(Conversation)
                .where(Conversation.id == conversation_id)
                .where(Conversation.user_id == request.user_id)
            ).first()

            if not existing_conv:
                raise HTTPException(status_code=404, detail="Conversation not found")

        # Add user message to conversation
        user_message = Message(
            id=str(uuid.uuid4()),
            conversation_id=conversation_id,
            role=MessageRoleEnum.user,
            content=request.message
        )
        session.add(user_message)
        session.commit()

        # Retrieve conversation history to provide context to the AI
        conversation_history = get_conversation_history(conversation_id, session)

        # Prepare the chat history for Cohere
        chat_history = []
        for msg in conversation_history:
            chat_history.append({
                "role": msg["role"],
                "message": msg["content"]
            })

        # Define the tools that Cohere can use
        tools = [
            {
                "name": "add_task",
                "description": "Add a new task to the user's task list",
                "parameter_definitions": {
                    "title": {
                        "description": "The title of the task",
                        "type": "str",
                        "required": True
                    },
                    "description": {
                        "description": "Optional description of the task",
                        "type": "str",
                        "required": False
                    },
                    "priority": {
                        "description": "Priority level ('high', 'medium', 'low')",
                        "type": "str",
                        "required": False,
                        "default": "medium"
                    }
                }
            },
            {
                "name": "list_tasks",
                "description": "List tasks for the user with optional filtering",
                "parameter_definitions": {
                    "status": {
                        "description": "Filter by status ('completed', 'pending', or None for all)",
                        "type": "str",
                        "required": False
                    },
                    "limit": {
                        "description": "Maximum number of tasks to return",
                        "type": "int",
                        "required": False,
                        "default": 10
                    }
                }
            },
            {
                "name": "complete_task",
                "description": "Mark a task as completed",
                "parameter_definitions": {
                    "task_id": {
                        "description": "ID of the task to complete",
                        "type": "str",
                        "required": True
                    }
                }
            },
            {
                "name": "delete_task",
                "description": "Delete a task from the user's list",
                "parameter_definitions": {
                    "task_id": {
                        "description": "ID of the task to delete",
                        "type": "str",
                        "required": True
                    }
                }
            },
            {
                "name": "update_task",
                "description": "Update a task with new information",
                "parameter_definitions": {
                    "task_id": {
                        "description": "ID of the task to update",
                        "type": "str",
                        "required": True
                    },
                    "updates": {
                        "description": "Dictionary of fields to update",
                        "type": "dict",
                        "required": True
                    }
                }
            }
        ]

        # Call Cohere with tools
        response = cohere_client.chat(
            message=request.message,
            chat_history=chat_history,
            tools=tools,
            model="command-r-plus"  # Using a model with strong tool use capabilities
        )

        # Process the response
        ai_response = ""

        if hasattr(response, 'tool_calls') and response.tool_calls:
            # Process tool calls
            for tool_call in response.tool_calls:
                tool_name = tool_call.name
                tool_parameters = tool_call.parameters

                # Execute the appropriate tool
                if tool_name == "add_task":
                    result = add_task(session, **tool_parameters)
                elif tool_name == "list_tasks":
                    result = list_tasks(session, **tool_parameters)
                elif tool_name == "complete_task":
                    result = complete_task(session, **tool_parameters)
                elif tool_name == "delete_task":
                    result = delete_task(session, **tool_parameters)
                elif tool_name == "update_task":
                    result = update_task(session, **tool_parameters)
                else:
                    result = {"success": False, "message": f"Unknown tool: {tool_name}"}

                # Add tool result to chat for follow-up
                ai_response += f"\nTool result: {result.get('message', str(result))}"
        else:
            # If no tool was called, use the text response
            if hasattr(response, 'text'):
                ai_response = response.text
            else:
                ai_response = "I processed your request, but I don't have a specific response to return."

        # Add AI response to conversation
        ai_message = Message(
            id=str(uuid.uuid4()),
            conversation_id=conversation_id,
            role=MessageRoleEnum.assistant,
            content=ai_response
        )
        session.add(ai_message)
        session.commit()

        return ChatResponse(
            response=ai_response,
            conversation_id=conversation_id,
            timestamp=datetime.now()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


@app.get("/")
def read_root():
    return {"status": "healthy", "message": "AI-Powered Todo API is Running"}


@app.get("/health")
def health_check():
    return {"status": "ok", "database": "connected", "ai_backend": "ready"}


# Import db module (assuming it exists)
try:
    import db
except ImportError:
    # If db module doesn't exist, create a minimal version
    from sqlmodel import create_engine
    from typing import Generator

    def get_engine():
        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            raise ValueError("DATABASE_URL environment variable is not set")
        return create_engine(database_url)

    def get_session():
        engine = get_engine()
        from sqlmodel import Session
        with Session(engine) as session:
            yield session