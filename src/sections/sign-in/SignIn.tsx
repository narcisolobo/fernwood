import SignInForm from "./SignInForm";

type SignInProps = {
  error?: string;
};

function SignIn({ error }: SignInProps) {
  return (
    <section id="sign-in" className="flex min-h-[70vh] items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display mb-4 text-center text-4xl font-semibold uppercase lg:text-6xl">
          Sign In
        </h1>
        {error === "auth-failed" && (
          <div role="alert" className="alert alert-error mx-auto mb-4 max-w-80">
            <span>
              We couldn&apos;t verify your magic link. Please try signing in
              again.
            </span>
          </div>
        )}
        <SignInForm />
      </div>
    </section>
  );
}

export default SignIn;
