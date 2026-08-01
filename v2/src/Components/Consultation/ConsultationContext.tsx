// Purpose: Site-wide consultation modal state (open from any CTA).
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { trackClientEvent } from "@/lib/analytics/trackClient";

type ConsultationContextValue = {
  isOpen: boolean;
  source: string;
  openConsultation: (source?: string) => void;
  closeConsultation: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(
  null,
);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");

  const openConsultation = useCallback((nextSource = "site") => {
    setSource(nextSource);
    setIsOpen((wasOpen) => {
      // Track only the transition closed -> open (avoid hash + CTA double fire).
      if (!wasOpen) {
        trackClientEvent(AnalyticsEvent.ConsultationOpen, {
          source: nextSource,
        }, { source: nextSource });
      }
      return true;
    });
  }, []);

  const closeConsultation = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Deep-link support: /#consultation or /#book
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "consultation" || hash === "book") {
        openConsultation(`hash:${hash}`);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [openConsultation]);

  // Global custom event for non-React links
  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      openConsultation(detail?.source ?? "event");
    };
    window.addEventListener("dali:open-consultation", onOpen);
    return () => window.removeEventListener("dali:open-consultation", onOpen);
  }, [openConsultation]);

  const value = useMemo(
    () => ({ isOpen, source, openConsultation, closeConsultation }),
    [isOpen, source, openConsultation, closeConsultation],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return ctx;
}

/** Safe hook when provider might be missing (e.g. isolated stories). */
export function useConsultationOptional() {
  return useContext(ConsultationContext);
}
