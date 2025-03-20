import TodoItem from "./TodoItem";
import useTasksStore from "../store/taskStore";

function TodoItems() {
  const tasks = useTasksStore((state) => state.tasks);
  const sortTasksByPriority = useTasksStore(
    (state) => state.sortTasksByPriority
  );

  const handleSortByPriority = () => {
    sortTasksByPriority();
  };

  return (
    <section className="todo-items-container">
      <div className="todo-controls">
        <button className="sort-btn" onClick={handleSortByPriority}>
          Sort by Priority From High to Low
        </button>
      </div>

      {tasks.map((currentTask) => (
        <TodoItem
          id={currentTask.id}
          key={currentTask.id}
          title={currentTask.taskTitle}
          description={currentTask.taskDescription}
          complete={currentTask.completed}
          priority={currentTask.priority}
        />
      ))}
    </section>
  );
}

export default TodoItems;
