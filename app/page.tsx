"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import type { Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  function handleTaskAdded(task: Task) {
    setTasks((currentTasks) => [...currentTasks, task]);
  }

  // async function handleStatusChange(
  //   id: number,
  //   status: TaskStatus
  // ) {
  //   try {
  //     const response = await fetch(`/api/tasks/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update task");
  //     }

  //     setTasks((currentTasks) =>
  //       currentTasks.map((task) =>
  //         task.id === id ? { ...task, status } : task
  //       )
  //     );
  //   } catch {
  //     setError("Failed to update task");
  //   }
  // }

  async function handleStatusChange(
  id: number,
  status: TaskStatus
) {
  try {
    setError("");

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    console.log("PATCH STATUS:", response.status);
    console.log("PATCH RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to update task");
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Failed to update task"
    );
  }
}
  return (
    <main className="task-board">
      <div className="container">
        <h1>MY TASK</h1>

        <TaskForm onTaskAdded={handleTaskAdded} />

        {loading && <p>Loading tasks...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <TaskList
            tasks={tasks}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </main>
  );
}