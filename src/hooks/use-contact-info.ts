import { useState, useEffect } from "react";
import { ContactInfo } from "@/types";

export function useContactInfo() {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const contactData = await response.json();
          setData(contactData);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactInfo();
  }, []);

  return { data, loading };
}
