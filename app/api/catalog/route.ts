import { NextResponse } from "next/server";
import { getServices, getQuestionsByService } from "@/lib/data";

export async function GET() {
  const [services, questions] = await Promise.all([getServices(), getQuestionsByService()]);
  return NextResponse.json({ services, questions });
}
