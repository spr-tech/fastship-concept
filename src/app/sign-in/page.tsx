import type { Metadata } from "next";
import SignInContent from "@/components/content/auth/signInContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: site.pageTitles.signIn,
};

export default function Page() {
  return <SignInContent />;
}
