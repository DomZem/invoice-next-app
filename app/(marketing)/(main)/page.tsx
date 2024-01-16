import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center pt-[72px] md:p-20">
      <section className="flex max-w-2xl flex-col items-center gap-3 px-2 text-center">
        <h2 className="text-starlessNight text-4xl font-bold dark:text-white">
          Easiest way to manage your invoices
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
          explicabo qui? Rerum ullam esse nemo voluptatum maiores repellendus
          ducimus ut totam? Nobis veritatis corporis nulla!
        </p>
        <Button asChild>
          <Link href="/register">Register account</Link>
        </Button>
      </section>
    </main>
  );
}
