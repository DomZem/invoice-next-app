import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { RegisterType } from '@/components/RegisterForm/formSchema';

const defaultValues: RegisterType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: '',
};

export default function RegisterPage() {
  return (
    <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue">
      <h2 className="mb-6 text-heading-m text-starlessNight dark:text-white md:text-heading-l">
        Register
      </h2>
      <RegisterForm defaultValues={defaultValues} />
    </section>
  );
}
