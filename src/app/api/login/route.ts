import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  let user = null;
  if (email === "123@qq.com" && password === "admin") {
    user = {
      id: 1,
      name: "Charlie",
      email: "12@qq.com",
    };
  }
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}