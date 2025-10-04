import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Feedback Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Turn Customer Feedback Into Action
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Automatically analyze, categorize, and prioritize feedback from multiple sources. 
            Focus on what truly matters with AI-powered insights.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-primary hover:bg-primary/90 shadow-elegant animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          >
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-primary" />}
            title="Smart Categorization"
            description="AI automatically categorizes feedback into bugs, features, UX issues, and more"
            delay="delay-400"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-primary" />}
            title="Impact Scoring"
            description="Every piece of feedback gets urgency and impact scores for better prioritization"
            delay="delay-500"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8 text-primary" />}
            title="Top 10 Priorities"
            description="Get a clear, actionable list of the most important issues to focus on"
            delay="delay-600"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div className={`p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 ${delay}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Hero;
