import TaskItem from "@/components/TaskItem";
import type { Task } from "@/types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Next.js",
    status: "TODO",
  },
  {
    id: 2,
    title: "Build API",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    title: "Connect MySQL",
    status: "DONE",
  },
];

export default function TaskList() {
  return (
    <section>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </section>
  );
}