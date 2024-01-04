import AppHeader from "@/components/AppHeader";
import Loading from "@/components/ui/Loading";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    redirect("/");
  }

  return (
    <div className="grid h-screen grid-rows-[72px_1fr] overflow-hidden md:grid-rows-[80px_1fr] lg:grid-cols-[103px_1fr] lg:grid-rows-none">
      <AppHeader />

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
