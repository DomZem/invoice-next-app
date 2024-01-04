import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
