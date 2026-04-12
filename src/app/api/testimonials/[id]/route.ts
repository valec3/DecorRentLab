import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { testimonialService } from "@/services/supabase/testimonials/service";

// GET /api/testimonials/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const testimonial = await testimonialService.getById(id);
    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("API Testimonials GET ID Error:", error);
    return NextResponse.json(
      { message: "Error fetching testimonial" },
      { status: 500 }
    );
  }
}

// PATCH /api/testimonials/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updatedTestimonial = await testimonialService.update(id, body);
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error("API Testimonials PATCH Error:", error);
    return NextResponse.json(
      { message: "Error updating testimonial" },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await testimonialService.delete(id);
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("API Testimonials DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting testimonial" },
      { status: 500 }
    );
  }
}
