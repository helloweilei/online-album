import { cookies } from "next/headers";

const SESSION_COOKIE = "album_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionUser {
  id: number;
  name: string;
  email: string;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const data = JSON.parse(decodeURIComponent(raw)) as SessionUser;
    if (data?.id && data?.name && data?.email) return data;
  } catch {
    // ignore invalid cookie
  }
  return null;
}
