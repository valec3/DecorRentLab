"use client";

import { createContext, useState, useEffect } from "react";
import { ContactInfo } from "@/types";

interface ContactInfoContextValue {
  data: ContactInfo | null;
  loading: boolean;
}

export const ContactInfoContext = createContext<ContactInfoContextValue>({
  data: null,
  loading: true,
});

export function ContactInfoProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <ContactInfoContext.Provider value={{ data, loading }}>
      {children}
    </ContactInfoContext.Provider>
  );
}
