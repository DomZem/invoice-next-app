import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { RegisterType } from "@/components/RegisterForm/formSchema";

const defaultValues: RegisterType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
};

export default function RegisterPage() {
  return <RegisterForm defaultValues={defaultValues} />;
}
