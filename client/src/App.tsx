import { useEffect } from "react";
import { Switch, Route, Router } from "wouter";
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
import Blog from "@/pages/Blog";
import Communities from "@/pages/Communities";
import Stories from "@/pages/Stories";
import Events from "@/pages/Events";
import KitRequest from "@/pages/KitRequest";
import NotFound from "@/pages/not-found";

function AppRouter() {
  // Track page views when routes change
  useAnalytics();
  
  // Detect if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname === 'swervycares.github.io';
  const basePath = isGitHubPages ? '/swervy-cares' : '';
  
  return (
    <Router base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mission" component={Mission} />
        <Route path="/volunteer" component={Volunteer} />
        <Route path="/donate" component={Donate} />
        <Route path="/share" component={Share} />
        <Route path="/blog" component={Blog} />
        <Route path="/communities" component={Communities} />
        <Route path="/stories" component={Stories} />
        <Route path="/events" component={Events} />
        <Route path="/request" component={KitRequest} />
        <Route component={NotFound} />
      </Switch>
    </Router>
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
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
