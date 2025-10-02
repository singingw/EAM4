import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gray-100 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border-4 border-blue-300"></div>
      <div className="absolute top-10 right-20 w-24 h-24 rounded-full border-2 border-blue-200"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-2 border-blue-200 opacity-50"></div>
      <div className="absolute bottom-24 left-10 w-16 h-16 rounded-full border-2 border-blue-300"></div>

      <Card className="w-full max-w-4xl shadow-2xl grid md:grid-cols-2 z-10 overflow-hidden">
        <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">XXX管理系統</h2>
            <p className="text-sm opacity-90">
              本系統為XXX網站之後台管理系統,請輸入管理者帳號、密碼登入本系統。
            </p>
            <p className="text-sm opacity-90 mt-2">
              非本系統管理者,請關閉本頁。
            </p>
          </div>
          <p className="text-xs opacity-80 mt-8">
            帳號問題請洽詢系統管理員
          </p>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">帳號登入</h2>
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}
