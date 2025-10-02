import AuthLayout from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an Account"
      description="Enter your details below to create your account"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
