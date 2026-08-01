"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={async () => {
        await fetch("/api/analytics/dashboard/logout", { method: "POST" });
        router.replace("/internal/analytics");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
