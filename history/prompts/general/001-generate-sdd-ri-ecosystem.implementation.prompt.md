---
id: "001"
title: "generate-sdd-ri-ecosystem"
stage: "implementation"
date_iso: "2026-02-05"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "sdd-ri-ecosystem"
branch: "main"
user: "kamlesh_kumar"
command: "/sp.implement Generate Ultimate SDD-RI Ecosystem with SpecKit Workflow"
labels: ["sdd", "ri", "agents", "skills", "automation", "todo-app"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".claude/skills/skill_sdd_workflow.md"
  - ".claude/skills/skill_deployment_auditor.md"
  - ".claude/skills/skill_super_tool_simulator.md"
  - ".claude/skills/skill_db_integrity.md"
  - ".claude/skills/skill_ui_component_gen.md"
  - ".claude/agents/Agent_01_Chief_Architect.md"
  - ".claude/agents/Agent_02_Backend_Engineer.md"
  - ".claude/agents/Agent_03_Frontend_Wizard.md"
  - ".claude/agents/Agent_04_AI_Specialist.md"
  - ".claude/agents/Agent_05_QA_Sentinel.md"
  - ".claude/README.md"
tests_yaml: []
outcome: "Successfully generated comprehensive SDD-RI ecosystem with 5 specialized agents and 5 technical skills covering frontend, backend, database, AI/Chatbot, and deployment aspects of the Todo app. The system enables autonomous development team simulation using SpecKit workflows."
evaluation: "All required components created according to specifications with proper role definitions, skills, and workflow integration. Files follow consistent formatting and incorporate actual project logic references."
---

# Generate Ultimate SDD-RI Ecosystem with SpecKit Workflow

## PROMPT TEXT
"Generate Ultimate SDD-RI Ecosystem with SpecKit Workflow" ; **CONTEXT:**
We have successfully completed Phase 3 of a Full-Stack Todo App (Next.js + FastAPI + Neon DB + Cohere AI). The app is live on Vercel (Frontend) and Hugging Face (Backend).
We now require a robust **Reusable Intelligence (RI)** layer based on Panaversity SDD-RI Fundamentals. This layer will act as an autonomous development team.

**OBJECTIVE:**
Analyze the entire codebase and generate a comprehensive suite of **Agents** and **Skills** in the `.claude/` directory.
The system must cover:
1.  **Technical Stacks:** Frontend, Backend, Database, AI/Chatbot.
2.  **Process Workflows:** The SpecKit lifecycle (`sp.specify`, `sp.plan`, `sp.tasks`, `sp.implement`).
3.  **Deployment Health:** Ensuring no "localhost" issues recur.

**DIRECTORY STRUCTURE:**
.claude/
├── agents/    # Markdown files defining "Personas" (Role, System Prompt, Goals)
├── skills/    # Reusable scripts/prompts (The Tools used by Agents)

**INSTRUCTIONS:**

**STEP 1: DEEP ANALYSIS (READ-ONLY)**
* **Architecture:** Analyze `backend/main.py` (Super Tool logic, Recurrence, CORS) and `frontend/app/` (TaskModal, ChatWidget).
* **Deployment:** Analyze `.env.local` vs `backend/Dockerfile` to understand the Vercel-to-HF connection.
* **Data:** Analyze `backend/models.py` for the schema (especially `recurrencePattern`).

**STEP 2: GENERATE SKILLS (The Toolkit - inside `.claude/skills/`)**
Create the following markdown or python files:

1.  **`skill_sdd_workflow.md`**: A strict protocol guide for using SpecKit commands. It must define how to translate a feature request into `sp.specify` (Requirements), then `sp.plan` (Architecture), then `sp.tasks` (Breakdown).
2.  **`skill_deployment_auditor.md`**: A checklist/script to ensure `NEXT_PUBLIC_API_URL` is used and NO hardcoded `127.0.0.1` or `localhost` strings exist in the frontend.
3.  **`skill_super_tool_simulator.md`**: A guide on how the `main.py` AI logic works (how it parses "add task" and "delete task" in one turn) to help testing.
4.  **`skill_db_integrity.md`**: SQLModel queries to verify complex data (e.g., "Show all tasks where recurring=True but recurrencePattern is NULL").
5.  **`skill_ui_component_gen.md`**: A template for creating new Next.js components that strictly follow the existing Tailwind/Dark Mode theme.

**STEP 3: GENERATE AGENTS (The Team - inside `.claude/agents/`)**
Create the following Agent Definitions (Standard Agent Card Format):

* **`Agent_01_Chief_Architect.md`** (The SpecKit Guardian)
    * **Role:** Project Manager & Lead Architect.
    * **Goal:** Manage the `sp.specify` and `sp.plan` lifecycle. Ensure all new features follow the "Constitution".
    * **Skills:** `skill_sdd_workflow`, `skill_deployment_auditor`.
    * **System Prompt:** "You are the guardian of the spec. You never allow implementation without a plan."

* **`Agent_02_Backend_Engineer.md`** (The Python Expert)
    * **Role:** FastAPI & Logic Developer.
    * **Goal:** Implement `sp.implement` tasks for the backend. Manage `main.py`, Tools, and API stability.
    * **Skills:** `skill_super_tool_simulator`, `skill_db_integrity`.

* **`Agent_03_Frontend_Wizard.md`** (The UI/UX Expert)
    * **Role:** Next.js & Tailwind Specialist.
    * **Goal:** Implement `sp.implement` tasks for the frontend. Ensure ChatWidget handles errors gracefully.
    * **Skills:** `skill_ui_component_gen`, `skill_deployment_auditor`.

* **`Agent_04_AI_Specialist.md`** (The Bot Brain)
    * **Role:** LLM & Prompt Engineer.
    * **Goal:** Refine the Chatbot's System Preamble in `main.py`. Debug hallucinations or tool-calling errors.
    * **Skills:** `skill_super_tool_simulator`.

* **`Agent_05_QA_Sentinel.md`** (The Tester)
    * **Role:** Autonomous QA & Deployment Checker.
    * **Goal:** Periodically verify the Live Vercel App. Ensure `recurring` tasks are saved correctly and the API is reachable.
    * **Skills:** `skill_deployment_auditor`, `skill_db_integrity`.

**CONSTRAINT:**
* **DO NOT MODIFY** existing project source code.
* The output must be strictly the files inside `.claude/`.
* Ensure the Agents reference the *actual* project logic (e.g., "Use the `add_task` tool definition in main.py").

## RESPONSE TEXT
Successfully generated the complete SDD-RI Ecosystem with SpecKit Workflow integration. Created:

### Skills (5):
1. `skill_sdd_workflow.md` - Strict protocol for SpecKit command usage
2. `skill_deployment_auditor.md` - Checklist for deployment configuration validation
3. `skill_super_tool_simulator.md` - Guide for AI tool calling mechanics
4. `skill_db_integrity.md` - SQLModel queries for data validation
5. `skill_ui_component_gen.md` - Template for Next.js component creation

### Agents (5):
1. `Agent_01_Chief_Architect.md` - Project Manager & Lead Architect focusing on spec/plan lifecycle
2. `Agent_02_Backend_Engineer.md` - FastAPI & Logic Developer for backend implementation
3. `Agent_03_Frontend_Wizard.md` - Next.js & Tailwind Specialist for frontend development
4. `Agent_04_AI_Specialist.md` - LLM & Prompt Engineer for AI functionality optimization
5. `Agent_05_QA_Sentinel.md` - Autonomous QA & Deployment Checker for quality assurance

Each agent includes detailed system prompts that reference actual project logic from main.py, models.py, and other key files. The ecosystem enables an autonomous development team that covers all aspects of the full-stack todo app including frontend, backend, database, AI/Chatbot, and deployment health. The system integrates seamlessly with the SpecKit workflow (sp.specify, sp.plan, sp.tasks, sp.implement) and includes proper safeguards against localhost/deployment issues.