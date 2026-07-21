"use client";

import { type ReactNode } from "react";
import AuthProvider from "@/context/AuthProvider";
import DrawerProvider from "@/context/DrawerProvider";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </AuthProvider>
  );
}

export default Providers;
