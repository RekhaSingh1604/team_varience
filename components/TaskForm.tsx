"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/types/task";

type TaskFormProps = {
  onTaskAdded: (task: Task) => void;
};

export default function TaskForm({
  onTaskAdded,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create task");
        return;
      }

      const newTask: Task = {
        id: data.result.insertId,
        title: title.trim(),
        status,
      };

      onTaskAdded(newTask);

      setTitle("");
      setStatus("TODO");
    } catch {
      setError("Failed to create task");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as TaskStatus)
        }
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <button type="submit">Add Task</button>

      {error && <p>{error}</p>}
    </form>
  );
}