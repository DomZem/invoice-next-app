import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <section className="shadow-wrapper w-full max-w-lg rounded-lg bg-white p-6 dark:bg-midnightBlue">
      <h2 className="mb-6 text-heading-m text-starlessNight dark:text-white md:text-heading-l">
        Login
      </h2>
      <LoginForm />
    </section>
  );
}
