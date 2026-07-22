import SignIn from "@/sections/sign-in/SignIn";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to Fernwood Pilates Studio to book Reformer and mat classes, join a waitlist, or manage your bookings.",
};

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

async function SignInPage({ searchParams }: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <main>
      <SignIn error={error} />
    </main>
  );
}

export { metadata };
export default SignInPage;
