import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { testimonialService } from "@/services/supabase/testimonials/service";

// GET /api/testimonials
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get("active") === "true";
    const search = searchParams.get("search") || undefined;

    const testimonials = await testimonialService.getAll({
      active: activeOnly || undefined,
      search,
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("API Testimonials GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTestimonial = await testimonialService.create(body);
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("API Testimonials POST Error:", error);
    return NextResponse.json(
      { message: "Error creating testimonial" },
      { status: 500 }
    );
  }
}
