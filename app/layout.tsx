import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navaloka - Platform Budaya Indonesia",
  description:
    "Satu platform untuk masa depan budaya Indonesia. Menghadirkan ekosistem budaya digital yang autentik, transparan, dan berkelanjutan dengan AI & Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="id" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <RoleProtectedRoute> {children}</RoleProtectedRoute>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
