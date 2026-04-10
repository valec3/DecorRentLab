import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services/supabase/products/service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const product = await productService.getProduct(slug);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Product Slug Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug: idOrSlug } = await params;
    const body = await request.json();
    const result = await productService.updateProduct(idOrSlug, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Product Slug PATCH Error:", error);
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug: idOrSlug } = await params;
    await productService.deleteProduct(idOrSlug);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("API Product Slug DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 },
    );
  }
}
