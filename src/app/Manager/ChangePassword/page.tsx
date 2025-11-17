import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { Card } from "@/components/ui/card";

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border-4 border-blue-300"></div>
      <div className="absolute top-10 right-20 w-24 h-24 rounded-full border-2 border-blue-200"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-2 border-blue-200 opacity-50"></div>
      <div className="absolute bottom-24 left-10 w-16 h-16 rounded-full border-2 border-blue-300"></div>

      <Card className="w-full max-w-4xl shadow-2xl grid md:grid-cols-2 z-10 overflow-hidden">
        <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center mb-8">會展活動智聯服務</h2>
          <div className="space-y-4 text-base opacity-90 text-center mb-auto">
            <p>
              本系統為會展活動智聯服務之後台管理系統,請在此頁面修改您的密碼。
            </p>
            <p>
              修改完成後，請使用新密碼重新登入。
            </p>
          </div>
          <p className="text-sm opacity-90 mt-auto pt-8 text-center">
            帳號問題請洽詢系統管理員
          </p>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-foreground">修改密碼</h2>
          <ChangePasswordForm />
        </div>
      </Card>
    </div>
  );
}
