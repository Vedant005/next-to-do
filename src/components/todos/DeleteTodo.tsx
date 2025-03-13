"use client";

import { todoProps } from "@/types";
import axios from "axios";
import { useState } from "react";
import Button from "../button/Button";
import { FaTrash } from "react-icons/fa";

const DeleteTodo = ({
  todo,
  onTodoDeleted,
}: {
  todo: todoProps;
  onTodoDeleted?: (deletedId: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/todos?_id=${todo._id}`);

      if (onTodoDeleted) onTodoDeleted(todo._id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      actionButton
      bgColor="bg-red-400"
      text={<FaTrash />}
      disabled={loading}
    />
  );
};

export default DeleteTodo;
