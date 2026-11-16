import type { DemoMessage, LinkItem, TwoLineHeading } from "./shared";

/** Copy shared by both auth forms. */
type AuthFormBase = {
  title: string;
  note: string;
  googleButton: string;
  divider: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  showPasswordLabel: string;
  submitText: string;
  notice: DemoMessage;
};

export type SignIn = {
  form: AuthFormBase & {
    subtitle: string;
    /** A button styled as a link that shows its own "not connected" notice. */
    forgotPassword: { label: string; notice: DemoMessage };
    switchPrompt: { text: string; link: LinkItem };
  };
  panel: {
    title: TwoLineHeading;
    text: string;
    card: {
      label: string;
      route: string;
      status: string;
      start: string;
      end: string;
    };
  };
};

export type SignUp = {
  form: AuthFormBase & {
    switchPrompt: { text: string; link: LinkItem };
    firstNameLabel: string;
    lastNameLabel: string;
    phoneLabel: string;
    phonePrefix: string;
    passwordHint: string;
    referralLabel: string;
    referralOptional: string;
    legal: {
      before: string;
      terms: LinkItem;
      middle: string;
      privacy: LinkItem;
      after: string;
    };
  };
  panel: {
    title: TwoLineHeading;
    text: string;
  };
};
