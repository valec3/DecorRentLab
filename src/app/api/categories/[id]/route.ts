import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services/supabase/products/service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const categories = await productService.getCategories();
    const category = categories.find((c) => c.id === id);

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
    const result = await productService.updateCategory(id, body);
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
    await productService.deleteCategory(id);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "Error deleting category" },
      { status: 500 },
    );
  }
}
