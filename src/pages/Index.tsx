import { useState } from "react";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return <Hero onGetStarted={() => setShowDashboard(true)} />;
};

export default Index;
