// Purpose: Client boundary for consultation provider + modal in root layout.
"use client";

import type { ReactNode } from "react";
import { ConsultationProvider } from "./ConsultationContext";
import ConsultationModal from "./ConsultationModal";

export default function ConsultationShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConsultationProvider>
      {children}
      <ConsultationModal />
    </ConsultationProvider>
  );
}
