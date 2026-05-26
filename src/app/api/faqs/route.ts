import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { faqService } from "@/services/supabase/faqs/service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get("active") === "true";

    const faqs = await faqService.getAll({
      active: activeOnly ? true : undefined,
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("API FAQs GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching faqs" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updatedFaqs = await faqService.replaceAll(body);

    revalidatePath("/");
    revalidatePath("/admin/faqs");

    return NextResponse.json(updatedFaqs);
  } catch (error) {
    console.error("API FAQs PUT Error:", error);
    return NextResponse.json(
      { message: "Error updating faqs" },
      { status: 500 },
    );
  }
}
