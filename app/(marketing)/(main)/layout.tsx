interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <header>
        <h1>Marketing Layout</h1>
      </header>
      {children}
    </>
  );
}
