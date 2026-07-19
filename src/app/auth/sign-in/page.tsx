import SignIn from "@/sections/sign-in/SignIn";

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

export default SignInPage;
