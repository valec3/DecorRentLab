import { NextRequest, NextResponse } from "next/server";
import { categoryService } from "@/services/supabase/categories/service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const category = await categoryService.getCategory(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching category" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await categoryService.updateCategory(id, body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Error updating category" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await categoryService.deleteCategory(id);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "Error deleting category" },
      { status: 500 },
    );
  }
}
