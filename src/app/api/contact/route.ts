import { NextResponse } from "next/server";
import { contactService } from "@/services/supabase/contact/service";

export async function GET() {
  try {
    const contactInfo = await contactService.getContactInfo();
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("API Contact GET Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const result = await contactService.saveContactInfo(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Contact PATCH Error:", error);
    return NextResponse.json(
      { message: "Error saving contact info" },
      { status: 500 },
    );
  }
}
