import AuthLayout from "@/components/layouts/authLayout";
import { signIn } from "@/data/auth";
import SignInForm from "./signInForm";
import SignInPanel from "./signInPanel";

export default function SignInContent() {
  return (
    <AuthLayout panelTone="ink" panel={<SignInPanel panel={signIn.panel} />}>
      <SignInForm form={signIn.form} />
    </AuthLayout>
  );
}
