"use client";

import type { Task, TaskStatus } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
};

export default function TaskItem({
  task,
  onStatusChange,
}: TaskItemProps) {
  function handleStatusChange() {
    const nextStatus: TaskStatus =
      task.status === "TODO"
        ? "IN_PROGRESS"
        : "DONE";

    onStatusChange(task.id, nextStatus);
  }

  return (
    <article>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>

      {task.status !== "DONE" && (
        <button
          type="button"
          onClick={handleStatusChange}
        >
          Change Status
        </button>
      )}
    </article>
  );
}