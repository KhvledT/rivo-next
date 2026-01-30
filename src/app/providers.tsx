// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Toaster as SonnerToaster } from "sonner"; // sonner wrapper (if you use sonner)
import { MobileOrderButton } from "@/components/MobileOrderButton";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import LenisProvider from "@/components/Providers/LenisProvider";

// create query client once (module scope) to persist cache across navigations
const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <LenisProvider>
          {/* Toasts / Notifications (global) */}
          <Toaster />
          <SonnerToaster />
          {/* Mobile floating order button */}
          <MobileOrderButton />
          {children}
          </LenisProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
