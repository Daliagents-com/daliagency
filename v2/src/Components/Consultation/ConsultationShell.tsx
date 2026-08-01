// Purpose: Client boundary for consultation provider + modal in root layout.
// Perf: modal chunk loads only after first open (or hash deep-link).
"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  ConsultationProvider,
  useConsultation,
} from "./ConsultationContext";

const ConsultationModal = dynamic(() => import("./ConsultationModal"), {
  ssr: false,
});

function LazyConsultationModal() {
  const { isOpen } = useConsultation();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isOpen) setShouldLoad(true);
  }, [isOpen]);

  if (!shouldLoad) return null;
  return <ConsultationModal />;
}

export default function ConsultationShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConsultationProvider>
      {children}
      <LazyConsultationModal />
    </ConsultationProvider>
  );
}
