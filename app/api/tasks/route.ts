import { db } from "@/lib/db";

export async function GET() {
  return Response.json({ message: "Tasks API working" });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { title, status } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return Response.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
    return Response.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  // SQL insert next step mein add karenge

  const [result] = await db.execute(
  "INSERT INTO tasks (title, status) VALUES (?, ?)",
  [title.trim(), status]
);

return Response.json(
  { message: "Task created successfully", result },
  { status: 201 }
);
}