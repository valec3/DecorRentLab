import { useContext } from "react";
import { ContactInfoContext } from "@/context/ContactInfoContext";

export function useContactInfo() {
  return useContext(ContactInfoContext);
}
