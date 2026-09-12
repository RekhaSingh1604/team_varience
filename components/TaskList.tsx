import TaskItem from "@/components/TaskItem";
import type { Task, TaskStatus } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (id: number, status: TaskStatus) => void;
};

export default function TaskList({
  tasks,
  onStatusChange,
}: TaskListProps) {
  return (
    <section>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </section>
  );
}