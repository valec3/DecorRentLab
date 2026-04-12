import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { aboutService } from "@/services/supabase/about/service";

export async function GET() {
  try {
    const content = await aboutService.getAbout();
    if (!content) {
      return NextResponse.json({ message: "Content not found" }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error("API About GET Error:", error);
    return NextResponse.json({ message: "Error fetching about content" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedContent = await aboutService.updateAbout(body);
    
    revalidatePath("/nosotros");
    revalidatePath("/admin/about");
    
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("API About PATCH Error:", error);
    return NextResponse.json({ message: "Error updating about content" }, { status: 500 });
  }
}
