import type { SignIn, SignUp } from "@/models/auth";
import { conceptLinks, fastshipLinks } from "./links";

const goToFastship = { label: "Go to Fastship.Africa", href: fastshipLinks.home };

export const signIn: SignIn = {
  form: {
    title: "Sign in",
    // Fastship's own wording, kept exactly as it is on their site.
    subtitle: "Your journey to seamless delivery starts here. Track, ship and move forward with confidence.",
    note: "This is a design concept, so sign-in is turned off. The fields are disabled, and nothing is collected, stored or sent.",
    googleButton: "Continue with Google",
    divider: "or with email",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    passwordLabel: "Password",
    showPasswordLabel: "Show password",
    // A button, not a link: on the auth pages the only way out to fastship.africa is the link inside a notice.
    forgotPassword: {
      label: "Forgot password?",
      notice: {
        before: "Password reset isn’t connected in this concept.",
        link: goToFastship,
        after: "to use the real one.",
      },
    },
    submitText: "Sign in",
    notice: {
      before: "Sign-in isn’t connected in this concept.",
      link: goToFastship,
      after: "to use the real one.",
    },
    switchPrompt: {
      text: "Don’t have an account?",
      link: { label: "Create one", href: conceptLinks.signUp },
    },
  },
  panel: {
    title: ["Welcome", "back."],
    text: "Your shipments, carriers and tracking, right where you left them.",
    card: {
      label: "Example shipment from Lagos to London, in transit.",
      route: "LOS → LHR",
      status: "In transit",
      start: "Picked up",
      end: "Delivered",
    },
  },
};

export const signUp: SignUp = {
  form: {
    title: "Create account",
    switchPrompt: {
      text: "Free to sign up. Already have one?",
      link: { label: "Sign in", href: conceptLinks.signIn },
    },
    note: "This is a design concept, so account creation is turned off. The fields are disabled, and nothing is collected, stored or sent.",
    googleButton: "Sign up with Google",
    divider: "or with email",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    phoneLabel: "Phone number",
    phonePrefix: "NG +234",
    passwordLabel: "Password",
    showPasswordLabel: "Show password",
    passwordHint: "Use 8 or more characters with a mix of letters, numbers and symbols",
    referralLabel: "Referral code",
    referralOptional: "(optional)",
    submitText: "Create account",
    notice: {
      before: "Account creation isn’t connected in this concept.",
      link: goToFastship,
      after: "to use the real one.",
    },
    legal: {
      before: "By creating an account you agree to Fastship.Africa’s",
      terms: { label: "terms of service", href: fastshipLinks.termsOfService },
      middle: "and",
      privacy: { label: "privacy policy", href: fastshipLinks.privacyPolicy },
      after: ".",
    },
  },
  panel: {
    title: ["One account.", "Five carriers."],
    text: "Let’s get your packages moving. Compare, book and track DHL, FedEx, UPS, Aramex and GIG from one dashboard.",
  },
};
