import { NextResponse } from "next/server";
import { categoryService } from "@/services/supabase/categories/service";

export async function GET() {
  try {
    const categories = await categoryService.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("API Categories Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await categoryService.createCategory(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("API Categories POST Error:", error);
    return NextResponse.json(
      { message: "Error creating category" },
      { status: 500 },
    );
  }
}
