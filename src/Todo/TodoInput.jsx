import { useRef, useEffect, useState } from "react";
import useTasksStore from "../store/taskStore";

const TodoInput = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");

  const addTask = useTasksStore((state) => state.addTask);
  const tasks = useTasksStore((state) => state.tasks);

  const inputRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleChangeTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleChangePriority = (e) => {
    setTaskPriority(e.target.value);
  };

  const clearForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("medium");
    inputRef.current.value = "";
    descriptionRef.current.value = "";
    inputRef.current.focus();
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return alert("Please add a task title");
    if (!taskDescription) return alert("Please add a task description");

    addTask({
      id: Math.ceil(Math.random() * 10000000),
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      priority: taskPriority,
      completed: false,
    });

    clearForm();
  };

  return (
    <form className="todo-input-form">
      <input
        type="text"
        placeholder="enter task title"
        className="todo-text-input"
        ref={inputRef}
        onChange={handleChangeTaskTitle}
        value={taskTitle}
      />
      <textarea
        placeholder="enter todo description"
        onChange={handleChangeTaskDescription}
        ref={descriptionRef}
        value={taskDescription}
      ></textarea>

      <div className="priority-selector">
        <label htmlFor="priority">Priority: </label>
        <select
          id="priority"
          value={taskPriority}
          onChange={handleChangePriority}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button className="submit-btn" onClick={handleAddTask}>
        Add todo
      </button>
    </form>
  );
};
export default TodoInput;
