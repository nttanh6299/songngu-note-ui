"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const queryClient = new QueryClient()

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <TailwindIndicator />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
