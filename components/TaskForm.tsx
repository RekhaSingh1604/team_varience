"use client";

import { useState } from "react";
import type { TaskStatus } from "@/types/task";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO:
    // 1. validate title
    // 2. later POST request yahan lagegi
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
    </form>
  );
}