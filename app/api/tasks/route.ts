import { db } from "@/lib/db";
import { submit } from '@/lib/submit'
// export async function GET() {
//   try {
//     const [rows] = await db.execute(
//       "SELECT * FROM tasks"
//     );

//     return Response.json(rows);
//   } catch {
//     return Response.json(
//       { error: "Failed to load tasks" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: Request) {
  const rssResponse = await fetch(/* rss endpoint */)
  const rssData = await rssResponse.json()
 
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>${rssData.title}</title>
 <description>${rssData.description}</description>
 <link>${rssData.link}</link>
 <copyright>${rssData.copyright}</copyright>
 ${rssData.items.map((item) => {
   return `<item>
    <title>${item.title}</title>
    <description>${item.description}</description>
    <link>${item.link}</link>
    <pubDate>${item.publishDate}</pubDate>
    <guid isPermaLink="false">${item.guid}</guid>
 </item>`
 })}
</channel>
</rss>`
 
  const headers = new Headers({ 'content-type': 'application/xml' })
 
  return new Response(rssFeed, { headers })
}
 
export async function POST(request: Request) {
  try {
    await submit(request)
    return new Response(null, { status: 204 })
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected error'
 
    return new Response(message, { status: 500 })
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const { title, status } = body;

//     if (
//       !title ||
//       typeof title !== "string" ||
//       title.trim() === ""
//     ) {
//       return Response.json(
//         { error: "Title is required" },
//         { status: 400 }
//       );
//     }

//     if (
//       !["TODO", "IN_PROGRESS", "DONE"].includes(status)
//     ) {
//       return Response.json(
//         { error: "Invalid status" },
//         { status: 400 }
//       );
//     }

//     const [result] = await db.execute(
//       "INSERT INTO tasks (title, status) VALUES (?, ?)",
//       [title.trim(), status]
//     );

//     return Response.json(
//       {
//         message: "Task created successfully",
//         result,
//       },
//       { status: 201 }
//     );
//   } catch {
//     return Response.json(
//       { error: "Failed to create task" },
//       { status: 500 }
//     );
//   }
// }