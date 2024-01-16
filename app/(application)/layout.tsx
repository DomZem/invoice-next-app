interface ApplicationLayout {
  children: React.ReactNode;
}

export default function ApplicationLayout({ children }: ApplicationLayout) {
  return (
    <>
      <header>
        <h1>Application Layout</h1>
      </header>
      {children}
    </>
  );
}
