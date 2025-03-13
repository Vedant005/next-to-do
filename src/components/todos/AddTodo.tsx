"use client";

import { useState } from "react";
import axios from "axios";
import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
import { todoProps } from "@/types";

// interface Todo {
//   _id: string;
//   title: string;
//   isCompleted: boolean;
// }
interface AddTodoProps {
  onTodoAdded?: (newTodo: todoProps) => void;
}

interface SavedTodo {
  _id: string;
  title?: string | null;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
  const [todo, setTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post<{ savedTodo: SavedTodo }>("/api/todos", {
        title: todo,
      });

      if (onTodoAdded) onTodoAdded(res.data.savedTodo as SavedTodo);
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <Input
          name="input"
          type="text"
          placeholder="Add Todo Here..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          type="submit"
          text={loading ? "Adding..." : "Add"}
          bgColor="bg-blue-600"
          disabled={loading}
        />
      </Form>
    </div>
  );
};

export default AddTodo;
