import { apiFetch } from "@/lib/api";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // Recipient is fixed server-side so the endpoint can't relay arbitrary mail.
  const res = await apiFetch("/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, to: siteConfig.email }),
    cache: "no-store",
  });
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
