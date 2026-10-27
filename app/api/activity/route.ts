import { apiFetch } from "@/lib/api";

const ALLOWED_PARAMS = ["category", "country", "limit"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();
  for (const key of ALLOWED_PARAMS) {
    const value = searchParams.get(key);
    if (value) params.set(key, value);
  }

  const res = await apiFetch(`/activity?${params.toString()}`, {
    cache: "no-store",
  });
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
