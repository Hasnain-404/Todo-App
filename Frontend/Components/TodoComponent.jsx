import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoComponent = () => {
  const [todoContent, setTodoContent] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const getTodo = await axios.get("https://todo-app-7i4k.onrender.com/todo/get", { withCredentials: true });
        setTodoContent(getTodo.data.TODOS);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          navigate("/login");
        }
      }
    };
    fetchTodo();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;

    try {
      const newTodo = { heading: newTask };
      const res = await axios.post("http://localhost:3000/todo/create", newTodo, { withCredentials: true });

      if (res.data.success) {
        setTodoContent((prevTodos) => [...prevTodos, { _id: res.data._id, heading: newTask.trim() }]);
        setNewTask(""); // Clear input field
      }
    } catch (error) {
      console.log(`Error in create in Frontend: ${error.message}`);
    }
  };

  //editing todo's
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setUpdatedText(currentText);
  };

  // Update a todo
  const updateTodo = async (id) => {
    if (!updatedText.trim()) return;

    try {
      await axios.put(`http://localhost:3000/todo/update/${id}`, { heading: updatedText }, { withCredentials: true });

      setTodoContent(todoContent.map((todo) => (todo._id === id ? { ...todo, heading: updatedText } : todo)));

      setEditingId(null);
    } catch (error) {
      console.log(`Error in updating todo: ${error.message}`);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, { withCredentials: true });
      setTodoContent(todoContent.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(`Error in delete todo: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-100 shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Todo List</h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            placeholder="Add a new task"
            className="p-2 w-3/4 border border-gray-300 rounded-md mr-2"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={addTodo}>
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="overflow-auto max-h-[calc(100vh-300px)]">
          <ul className="space-y-3">
            {todoContent.map((todo) => (
              <li key={todo._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between border-b border-gray-200">
                {editingId === todo._id ? (
                  <input
                    type="text"
                    value={updatedText}
                    className="border p-2 rounded w-3/4"
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                ) : (
                  <span className="text-lg break-words w-3/4">{todo.heading}</span>
                )}

                <div className="flex items-center space-x-2">
                  {editingId === todo._id ? (
                    <button className="text-green-500 hover:text-green-600" onClick={() => updateTodo(todo._id)}>
                      Save
                    </button>
                  ) : (
                    <button className="text-yellow-500 hover:text-yellow-600" onClick={() => startEditing(todo._id, todo.heading)}>
                      Update
                    </button>
                  )}

                  <button className="text-red-500 hover:text-red-700" onClick={() => deleteTodo(todo._id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
