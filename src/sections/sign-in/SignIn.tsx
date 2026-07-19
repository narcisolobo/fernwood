import SignInForm from "./SignInForm";

function SignIn() {
  return (
    <section id="sign-in" className="flex min-h-[70vh] items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display mb-4 text-center text-4xl font-semibold uppercase lg:text-6xl">
          Sign In
        </h1>
        <SignInForm />
      </div>
    </section>
  );
}

export default SignIn;
