// 'use client';

// import React, { useState, useEffect } from 'react';
// import { taskApi, authApi } from '../../lib/api';
// import { Task, CreateTaskRequest } from '../../lib/types';
// import TaskGrid from '../dashboard/components/TaskGrid';
// import TaskModal from '../dashboard/components/TaskModal';
// import SearchBar from '../dashboard/components/SearchBar';
// import FilterSidebar from '../dashboard/components/FilterSidebar';
// import { useTaskFilters } from '../dashboard/hooks/useTaskFilters';
// import { useNotifications } from '../dashboard/hooks/useNotifications';

// const TasksPage: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
//   const { filters, setFilters, clearFilters } = useTaskFilters(tasks);
//   const { requestPermission, checkForUpcomingTasks } = useNotifications();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

//   // Check authentication status on mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         console.log("DEBUG: About to verify token in tasks page");
//         const result = await authApi.verifyToken();
//         console.log("DEBUG: Token verification result:", result);
//         setIsAuthenticated(result.success);
//       } catch (err: any) {
//         console.error("DEBUG: Token verification error:", err);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // Fetch tasks on mount
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const result = await taskApi.getTasks();

//         if (result.success) {
//           setTasks(result.data || []);
//         } else {
//           setError(result.error || 'Failed to fetch tasks');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching tasks');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated) {
//       fetchTasks();
//     }
//   }, [isAuthenticated]);

//   // Combine search and filter results
//   useEffect(() => {
//     let result = [...tasks]; // Start with all tasks

//     // Apply search filter if there's a search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         task =>
//           task.title.toLowerCase().includes(query) ||
//           (task.description && task.description.toLowerCase().includes(query))
//       );
//     }

//     setFilteredTasks(result);
//   }, [tasks, searchQuery]);

//   // Check for upcoming tasks when tasks change
//   useEffect(() => {
//     if (tasks.length > 0) {
//       checkForUpcomingTasks(tasks);
//     }
//   }, [tasks, checkForUpcomingTasks]);

//   // Request notification permission on mount
//   useEffect(() => {
//     requestPermission();
//   }, [requestPermission]);

//   const handleCreateTask = async (taskData: CreateTaskRequest) => {
//     try {
//       const result = await taskApi.createTask(taskData);

//       if (result.success) {
//         setTasks([...tasks, result.data]);
//         setShowModal(false);
//       } else {
//         setError(result.error || 'Failed to create task');
//       }
//     } catch (err) {
//       setError('An error occurred while creating the task');
//     }
//   };

//   const handleUpdateTask = async (taskId: string, taskData: CreateTaskRequest) => {
//     try {
//       const result = await taskApi.updateTask(taskId, taskData);

//       if (result.success) {
//         setTasks(tasks.map(task => task.id === taskId ? result.data : task));
//         setShowModal(false);
//         setEditingTask(null);
//       } else {
//         setError(result.error || 'Failed to update task');
//       }
//     } catch (err) {
//       setError('An error occurred while updating the task');
//     }
//   };

//   const handleSubmitTask = (taskData: CreateTaskRequest) => {
//     if (editingTask) {
//       handleUpdateTask(editingTask.id, taskData);
//     } else {
//       handleCreateTask(taskData);
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       try {
//         const result = await taskApi.deleteTask(taskId);

//         if (result.success) {
//           setTasks(tasks.filter(task => task.id !== taskId));
//         } else {
//           setError(result.error || 'Failed to delete task');
//         }
//       } catch (err) {
//         setError('An error occurred while deleting the task');
//       }
//     }
//   };

//   const handleToggleComplete = async (taskId: string) => {
//     try {
//       const result = await taskApi.toggleTaskCompletion(taskId);

//       if (result.success) {
//         setTasks(tasks.map(task =>
//           task.id === taskId ? { ...task, completed: !task.completed } : task
//         ));
//       } else {
//         setError(result.error || 'Failed to update task');
//       }
//     } catch (err) {
//       setError('An error occurred while updating the task');
//     }
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setShowModal(true);
//   };

//   if (!isAuthenticated) {
//     // Redirect to signin if not authenticated
//     if (typeof window !== 'undefined') {
//       window.location.href = '/login';
//     }

//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//           <p>Please log in to access your tasks.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <header className="bg-white dark:bg-gray-800 shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {error && (
//           <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left sidebar - filters */}
//           <div className="lg:w-1/4">
//             <div className="sticky top-4 space-y-6">
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 + Add New Task
//               </button>

//               <FilterSidebar
//                 filters={filters}
//                 onFilterChange={setFilters}
//                 onClearFilters={clearFilters}
//               />
//             </div>
//           </div>

//           {/* Main content - tasks */}
//           <div className="lg:w-3/4">
//             <div className="mb-6">
//               <SearchBar onSearch={setSearchQuery} />
//             </div>

//             <TaskGrid
//               tasks={filteredTasks}
//               onEdit={handleEditTask}
//               onDelete={handleDeleteTask}
//               onComplete={handleToggleComplete}
//               loading={loading}
//             />
//           </div>
//         </div>

//         {/* Task Modal */}
//         {showModal && (
//           <TaskModal
//             isOpen={showModal}
//             onClose={() => {
//               setShowModal(false);
//               setEditingTask(null);
//             }}
//             onSubmit={handleSubmitTask}
//             task={editingTask}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default TasksPage;