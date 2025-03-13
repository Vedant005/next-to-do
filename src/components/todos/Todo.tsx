"use client";

import { useState } from "react";
import { todoProps } from "@/types";
import ChangeTodo from "./ChangeTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const TodoComponent = ({ todo }: { todo: todoProps }) => {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [isVisible, setIsVisible] = useState(true);

  const todoStyle = {
    textDecoration: currentTodo.isCompleted ? "line-through" : "none",
    opacity: currentTodo.isCompleted ? 0.5 : 1,
  };

  if (!isVisible) return null;

  return (
    <div
      style={todoStyle}
      className="w-10/12 mx-auto flex items-center justify-between bg-slate-900 py-4 px-20 rounded-2xl"
      key={todo._id}
    >
      {/* Toggle Todo Status */}
      <ChangeTodo
        todo={currentTodo}
        onStatusChange={(updatedTodo) => setCurrentTodo(updatedTodo)}
      />

      {/* Todo Title */}
      <span className="text-center font-bold uppercase grow">
        {currentTodo.title}
      </span>

      {/* Edit Todo */}
      <div className="flex items-center mx-2">
        <EditTodo
          todo={currentTodo}
          onTodoUpdated={(updatedTodo) => setCurrentTodo(updatedTodo)}
        />
      </div>

      {/* Delete Todo */}
      <div className="flex items-center">
        <DeleteTodo
          todo={currentTodo}
          onTodoDeleted={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
};

export default TodoComponent;
