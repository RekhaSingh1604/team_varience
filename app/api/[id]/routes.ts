// import { submit } from '@/lib/submit'
 
// export async function POST(request: Request) {
//   try {
//     await submit(request)
//     return new Response(null, { status: 204 })
//   } catch (reason) {
//     const message =
//       reason instanceof Error ? reason.message : 'Unexpected error'
 
//     return new Response(message, { status: 500 })
//   }
// }

import { db } from "@/lib/db";
import type { TaskStatus } from "@/types/task";

const validStatuses: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
];


// import type { NextRequest } from 'next/server'
 
// export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
//   const { id } = await ctx.params
//   return Response.json({ id })
// }


// export async function POST(request: Request) {
//   const res = await request.json()
//   return Response.json({ res })
// }
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return Response.json(
        { error: "Invalid task ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!validStatuses.includes(status)) {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, taskId]
    );

    const affectedRows = (result as { affectedRows: number }).affectedRows;

    if (affectedRows === 0) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Task status updated successfully",
    });
  } catch {
    return Response.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}