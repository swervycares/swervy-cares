import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "../hooks/use-analytics";
import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import Volunteer from "@/pages/Volunteer";
import Donate from "@/pages/Donate";
import Share from "@/pages/Share";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mission" component={Mission} />
      <Route path="/volunteer" component={Volunteer} />
      <Route path="/donate" component={Donate} />
      <Route path="/share" component={Share} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
