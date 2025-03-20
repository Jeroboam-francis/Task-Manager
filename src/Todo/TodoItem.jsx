import React, { useState } from "react";
import useTasksStore from "../store/taskStore";

function TodoItem({ id, title, description, complete, priority }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPriority, setNewPriority] = useState(priority || "medium");

  const completeTask = useTasksStore((state) => state.completeTask);
  const incompleteTask = useTasksStore((state) => state.incompleteTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTaskPriority = useTasksStore((state) => state.updateTaskPriority);

  const handleMarkAsDone = (e) => {
    e.preventDefault();
    completeTask(id);
  };

  const handleMarkIncomplete = (e) => {
    e.preventDefault();
    incompleteTask(id);
  };

  const handleDeleteTask = (e) => {
    e.preventDefault();
    deleteTask(id);
  };

  const handleEditPriority = () => {
    setIsEditing(true);
  };

  const handleSavePriority = () => {
    updateTaskPriority(id, newPriority);
    setIsEditing(false);
  };

  const handleChangePriority = (e) => {
    setNewPriority(e.target.value);
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  return (
    <div className={`todo-item ${getPriorityColor()}`}>
      <h3 className={complete ? "todo-title complete" : "todo-title"}>
        {title}
      </h3>
      <p className={complete ? "complete" : ""}>{description}</p>

      <div className="todo-item__priority">
        {isEditing ? (
          <div className="priority-edit">
            <select value={newPriority} onChange={handleChangePriority}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={handleSavePriority}>Save</button>
          </div>
        ) : (
          <div className="priority-badge" onClick={handleEditPriority}>
            Priority: {priority || "Medium"}
          </div>
        )}
      </div>

      <div className="todo-item__controls">
        <button onClick={complete ? handleMarkIncomplete : handleMarkAsDone}>
          {complete ? "Mark as incomplete" : "Mark as done"}
        </button>
        <button className="delete-btn" onClick={handleDeleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
