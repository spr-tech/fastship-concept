import type { Metadata } from "next";
import SignUpContent from "@/components/content/auth/signUpContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: site.pageTitles.signUp,
};

export default function Page() {
  return <SignUpContent />;
}
