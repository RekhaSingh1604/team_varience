import type { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <article>
      <h3>{task.title}</h3>

      <p>{task.status}</p>

      <button type="button">
        Change Status
      </button>
    </article>
  );
}