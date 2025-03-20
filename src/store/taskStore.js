import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const tasksStore = (set) => ({
  tasks: [],

  addTask: (task) => {
    set((previousState) => {
      return { tasks: [task, ...previousState.tasks] };
    });
  },

  updateTaskPriority: (taskId, priority) => {
    set((state) => {
      const updatedTasks = state.tasks.map((currentTask) => {
        if (currentTask.id == taskId) currentTask.priority = priority;
        return currentTask;
      });
      return { tasks: updatedTasks };
    });
  },

  sortTasksByPriority: () => {
    set((state) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      const sortedTasks = [...state.tasks].sort((a, b) => {
        const priorityA = a.priority
          ? priorityOrder[a.priority]
          : priorityOrder.low;
        const priorityB = b.priority
          ? priorityOrder[b.priority]
          : priorityOrder.low;
        return priorityA - priorityB;
      });
      return { tasks: sortedTasks };
    });
  },

  completeTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.map((currentTask) => {
        if (currentTask.id == taskId) currentTask.completed = true;
        return currentTask;
      });
      return { tasks: updatedTasks };
    });
  },

  incompleteTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.map((currentTask) => {
        if (currentTask.id == taskId) currentTask.completed = false;
        return currentTask;
      });
      return { tasks: updatedTasks };
    });
  },

  deleteTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.filter(
        (currentTask) => currentTask.id !== taskId
      );
      return { tasks: updatedTasks };
    });
  },
});

const useTasksStore = create(devtools(persist(tasksStore, { name: "tasks" })));
export default useTasksStore;
