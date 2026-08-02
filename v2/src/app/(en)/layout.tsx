// Purpose: Root layout for the default (English) tree - server-rendered lang="en".
import { AppShell, sharedMetadata } from "../shared-layout";

export const metadata = sharedMetadata;

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell lang="en">{children}</AppShell>;
}
