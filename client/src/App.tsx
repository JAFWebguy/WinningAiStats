import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { Dashboard } from "./pages/dashboard";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { trackPageView } from "./lib/analytics";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page views when route changes
    trackPageView(location);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;