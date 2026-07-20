"use client";

import { useActionState } from "react";
import { IconMail } from "@tabler/icons-react";
import { signIn } from "@/app/auth/sign-in/action";

function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, null);
  return (
    <form action={formAction} className="card mx-auto max-w-80 shadow">
      <div className="card-body bg-base-200">
        <label className="input mb-2">
          <IconMail />
          <input
            autoComplete="email"
            name="email"
            type="email"
            className="grow"
            placeholder="Email"
            required
          />
        </label>
        {state?.error && (
          <p className="text-error mb-2 text-sm">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-success mb-2 text-sm">
            Check your email for a magic link.
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending
            ? "Sending..."
            : state?.success
              ? "Link sent"
              : "Send Magic Link"}
        </button>
      </div>
    </form>
  );
}

export default SignInForm;
