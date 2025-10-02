import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gray-100 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border-4 border-blue-300"></div>
      <div className="absolute top-10 right-20 w-24 h-24 rounded-full border-2 border-blue-200"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-2 border-blue-200 opacity-50"></div>
      <div className="absolute bottom-24 left-10 w-16 h-16 rounded-full border-2 border-blue-300"></div>

      <Card className="w-full max-w-md shadow-2xl z-10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground text-center">忘記密碼</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
