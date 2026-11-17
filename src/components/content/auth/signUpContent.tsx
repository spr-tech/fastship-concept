import AuthLayout from "@/components/layouts/authLayout";
import { signUp } from "@/data/auth";
import SignUpForm from "./signUpForm";
import SignUpPanel from "./signUpPanel";

export default function SignUpContent() {
  return (
    <AuthLayout panelTone="accent" panel={<SignUpPanel panel={signUp.panel} />}>
      <SignUpForm form={signUp.form} />
    </AuthLayout>
  );
}
