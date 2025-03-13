"use client";

import { todoProps } from "@/types";
import axios from "axios";
import { useState } from "react";
import Button from "../button/Button";
import { FaCheck } from "react-icons/fa";

const ChangeTodo = ({
  todo,
  onStatusChange,
}: {
  todo: todoProps;
  onStatusChange?: (updatedTodo: todoProps) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/todos?_id=${todo._id}`);

      if (onStatusChange) {
        onStatusChange({ ...todo, isCompleted: !todo.isCompleted }); // ✅ Update UI state immediately
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      text={<FaCheck />}
      onClick={handleStatusChange}
      actionButton
      bgColor={todo.isCompleted ? "bg-green-400" : "bg-blue-500"}
      disabled={loading}
    />
  );
};

export default ChangeTodo;
