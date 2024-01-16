import AppHeader from '@/components/AppHeader';

interface ApplicationLayout {
  children: React.ReactNode;
}

export default function ApplicationLayout({ children }: ApplicationLayout) {
  return (
    <aside className="grid h-screen grid-rows-[72px_1fr] overflow-hidden md:grid-rows-[80px_1fr] lg:grid-cols-[103px_1fr] lg:grid-rows-none">
      <AppHeader />

      {children}
    </aside>
  );
}
