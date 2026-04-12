import { aboutService } from "@/services/supabase/about/service";
import { AboutContent } from "@/types";

export async function fetchAboutContent(): Promise<AboutContent | null> {
  try {
    return await aboutService.getAbout();
  } catch (error) {
    console.error("fetchAboutContent Error:", error);
    return null;
  }
}
