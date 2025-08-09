import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { authOptions } from "../[...nextauth]/options"; // adjust if your path differs

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Sign a new token based on session user
  interface ExtendedUser {
    _id?: string;
    email?: string | null;
    role?: string;
    name?: string | null;
    image?: string | null;
  }

  const user = session.user as ExtendedUser;

  const token = jwt.sign(
    {
      id: user._id, // using _id from DB
      email: user.email,
      role: user.role || "User",
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token });
}
