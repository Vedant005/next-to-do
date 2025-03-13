"use client";

import { useState, useEffect } from "react";
import AddTodo from "@/components/todos/AddTodo";
import TodoComponent from "@/components/todos/Todo";
import { todoProps } from "@/types";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState<todoProps[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("/api/todos");

        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  }, []);

  function handleTodoAdded(newTodo: todoProps) {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  // function handleTodoUpdated(updatedTodo: todoProps) {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
  //   );
  // }

  // function handleTodoDeleted(todoId: string) {
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
  // }

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-5xl font-extrabold uppercase">TODO APP</span>

      <div className="flex justify-center flex-col items-center">
        <AddTodo onTodoAdded={handleTodoAdded} />
      </div>

      <div className="w-full flex flex-col gap-4 mt-8">
        {todos.length > 0 ? (
          todos.map((todo) => <TodoComponent key={todo._id} todo={todo} />)
        ) : (
          <p className="text-gray-400 mt-4">No todos available</p>
        )}
      </div>
    </div>
  );
}
