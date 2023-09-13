import { useState } from "react";
import "../App.css";

export default function Input() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          placeholder="Add task"
        />
        <button className="btn">ADD</button>
      </form>
      <h1>To Do List: {todos.length}</h1>
      <ol>
        {todos.length === 0 && "All is done! 🤘Good Job!"}
        {todos.map((todo) => {
          return (
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
