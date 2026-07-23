import SignIn from "@/sections/sign-in/SignIn";
import { Metadata } from "next";

const meta = {
  title: "Sign In - Fernwood Pilates Studio",
  description:
    "Sign in to Fernwood Pilates Studio to book Reformer and mat classes, join a waitlist, or manage your bookings.",
};

const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://fernwood.narcisolobo.com/auth/sign-in",
    type: "website",
  },
};

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

async function SignInPage({ searchParams }: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex-1">
      <SignIn error={error} />
    </main>
  );
}

export { metadata };
export default SignInPage;
