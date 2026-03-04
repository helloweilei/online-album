import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  let user: { id: number; name: string; email: string } | null = null;
  if (email === "123@qq.com" && password === "admin") {
    user = {
      id: 1,
      name: "Charlie",
      email: "123@qq.com",
    };
  }
  if (!user) {
    return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
  }
  const store = await cookies();
  store.set("album_session", encodeURIComponent(JSON.stringify(user)), getSessionCookieOptions());
  return NextResponse.json({ user });
}
