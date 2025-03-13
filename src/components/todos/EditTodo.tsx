"use client";

import { useState } from "react";
import axios from "axios";
import Form from "../form/Form";
import Input from "../input/Input";
import Button from "../button/Button";
import { todoProps } from "@/types";
import { MdEdit } from "react-icons/md";

const EditTodo = ({
  todo,
  onTodoUpdated,
}: {
  todo: todoProps;
  onTodoUpdated?: (updatedTodo: todoProps) => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    if (!todo.isCompleted) setEditMode(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle?.trim()) return;

    setLoading(true);
    try {
      const res = await axios.put(`/api/todos?_id=${todo._id}`, {
        title: newTitle,
      });
      if (onTodoUpdated) onTodoUpdated(res.data.updatedTodo);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEditClick} text={<MdEdit />} actionButton />
      {editMode && (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="newTitle"
            placeholder="Edit Todo..."
            value={newTitle ?? ""}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button
            type="submit"
            text={loading ? "Saving..." : "Save"}
            disabled={loading}
          />
        </Form>
      )}
    </div>
  );
};

export default EditTodo;
