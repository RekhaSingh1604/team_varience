import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tasks"
    );

    return Response.json(rows);
  } catch {
    return Response.json(
      { error: "Failed to load tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, status } = body;

    if (
      !title ||
      typeof title !== "string" ||
      title.trim() === ""
    ) {
      return Response.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (
      !["TODO", "IN_PROGRESS", "DONE"].includes(status)
    ) {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "INSERT INTO tasks (title, status) VALUES (?, ?)",
      [title.trim(), status]
    );

    return Response.json(
      {
        message: "Task created successfully",
        result,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}