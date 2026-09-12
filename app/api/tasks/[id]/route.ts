import { db } from "@/lib/db";
import type { TaskStatus } from "@/types/task";

const validStatuses: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Get task id from URL
    const { id } = await params;
    const taskId = Number(id);

    // Validate id
    if (!Number.isInteger(taskId) || taskId <= 0) {
      return Response.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    // Read request body
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!validStatuses.includes(status)) {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Check whether task exists
    const [rows] = await db.execute(
      "SELECT id FROM tasks WHERE id = ?",
      [taskId]
    );

    const existingTasks = rows as { id: number }[];

    if (existingTasks.length === 0) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // Update task status
    await db.execute(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, taskId]
    );

    // Get updated task
    const [updatedRows] = await db.execute(
      "SELECT id, title, status FROM tasks WHERE id = ?",
      [taskId]
    );

    const updatedTasks = updatedRows as {
      id: number;
      title: string;
      status: TaskStatus;
    }[];

    return Response.json(updatedTasks[0], { status: 200 });
  } catch (error) {
    console.error("PATCH /api/tasks/[id] ERROR:", error);

    return Response.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}