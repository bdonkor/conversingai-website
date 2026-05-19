import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Conversing AI Dashboard",
    template: "%s | Conversing AI",
  },
  description:
    "Monitor your AI receptionist performance — calls, appointments, leads, and analytics in one place.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body>
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0d1424",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f1f5f9",
              },
            }}
          />
        </body>
      </html>
  );
}
