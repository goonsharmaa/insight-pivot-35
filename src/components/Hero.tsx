import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Target,
  Upload,
  Brain,
  Zap,
  Users,
  BarChart3,
  Mail,
  MessageSquare,
  FileText,
  Share2,
  Lightbulb
} from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const [demoInput, setDemoInput] = useState("");
  const [showDemoResult, setShowDemoResult] = useState(false);

  const handleDemo = () => {
    if (demoInput.trim()) {
      setShowDemoResult(true);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Insightlytics
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </Button>
            <Button onClick={onGetStarted}>Try Demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-50" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-primary/20" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Feedback Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Turn chaotic customer feedback into clear product priorities
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            AI-powered insights to help product teams focus on what truly matters. 
            Automatically analyze, categorize, and prioritize feedback from multiple sources.
          </p>
          
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-[var(--gradient-primary)] hover:opacity-90 shadow-elegant"
            >
              Try Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              onClick={() => scrollToSection('how-it-works')}
              variant="outline" 
              size="lg"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon={<Upload className="w-8 h-8 text-primary" />}
              title="Collect Feedback"
              description="From surveys, apps, social media, and more"
              delay="delay-100"
            />
            <StepCard
              number="2"
              icon={<Brain className="w-8 h-8 text-primary" />}
              title="AI Analysis"
              description="Categorizes by urgency and impact automatically"
              delay="delay-200"
            />
            <StepCard
              number="3"
              icon={<Target className="w-8 h-8 text-primary" />}
              title="Prioritized Insights"
              description="Creates weekly action lists for Notion, Slack, or Email"
              delay="delay-300"
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Interactive Demo</h2>
          <p className="text-muted-foreground text-center mb-12">
            Paste some feedback and see the AI in action
          </p>
          
          <Card className="p-6 shadow-elegant">
            <Textarea
              placeholder="Example: The app crashes when I upload large files. Also, the dark mode needs better contrast. Love the new export feature though!"
              className="min-h-32 mb-4"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
            />
            <Button onClick={handleDemo} className="w-full">
              <Zap className="mr-2 w-4 h-4" />
              Analyze Feedback
            </Button>
            
            {showDemoResult && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FeedbackResult
                  text="The app crashes when I upload large files"
                  category="Bug"
                  urgency="Urgent"
                  impact="High Impact"
                />
                <FeedbackResult
                  text="The dark mode needs better contrast"
                  category="UX"
                  urgency="Medium"
                  impact="Medium Impact"
                />
                <FeedbackResult
                  text="Love the new export feature"
                  category="Feature"
                  urgency="Low"
                  impact="Low Priority"
                />
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Dashboard Preview</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <DashboardCard
              title="Top 3 Pain Points"
              icon={<TrendingUp className="w-6 h-6" />}
              items={["App crashes on upload", "Poor mobile experience", "Slow loading times"]}
            />
            <DashboardCard
              title="Urgent Issues"
              icon={<Zap className="w-6 h-6" />}
              items={["Login failure (12 reports)", "Payment gateway down", "Data sync broken"]}
            />
            <DashboardCard
              title="Weekly Action Plan"
              icon={<Target className="w-6 h-6" />}
              items={["Fix upload crash bug", "Optimize mobile UI", "Investigate sync issues"]}
            />
          </div>
          
          <div className="text-center mt-8">
            <Button onClick={onGetStarted} size="lg" className="bg-[var(--gradient-primary)]">
              <BarChart3 className="mr-2 w-5 h-5" />
              Generate Insights
            </Button>
          </div>
        </div>
      </section>

      {/* AI Integration Highlight */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-4">AI in Action</h2>
          <p className="text-muted-foreground text-center mb-12">
            Powered by GPT-based analysis for prioritization accuracy
          </p>
          
          <Card className="p-8 shadow-elegant">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <FlowStep icon={<MessageSquare />} label="Feedback Clustering" />
              <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
              <FlowStep icon={<Brain />} label="AI Ranking" />
              <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
              <FlowStep icon={<FileText />} label="Notion/Slack Export" />
            </div>
          </Card>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12">Seamless Integrations</h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            <IntegrationIcon 
              icon={<FileText className="w-12 h-12" />} 
              name="Notion"
              tooltip="Send weekly report to Notion"
            />
            <IntegrationIcon 
              icon={<MessageSquare className="w-12 h-12" />} 
              name="Slack"
              tooltip="Post insights to Slack channels"
            />
            <IntegrationIcon 
              icon={<Mail className="w-12 h-12" />} 
              name="Email"
              tooltip="Receive reports via email"
            />
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Innovation in Insights</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Insightlytics predicts which feedback trends will impact NPS the most
              </p>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">AI-Generated Customer Personas</h3>
                <div className="space-y-3">
                  <PersonaCard name="Power User Paula" pain="Needs advanced features" impact="High" />
                  <PersonaCard name="Mobile Mike" pain="Poor mobile experience" impact="Critical" />
                  <PersonaCard name="Budget Betty" pain="Pricing concerns" impact="Medium" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Engagement Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12">Community Insights</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Sarah Chen, PM @ TechCorp</p>
                  <p className="text-sm text-muted-foreground">"Our biggest pain point: slow checkout flow"</p>
                </div>
              </div>
              <Badge>Bug - High Impact</Badge>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Alex Kumar, Designer</p>
                  <p className="text-sm text-muted-foreground">"Users want dark mode across all pages"</p>
                </div>
              </div>
              <Badge variant="secondary">Feature - Medium Impact</Badge>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 w-5 h-5" />
              Share Your Top Insight on LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-2">
                Insightlytics
              </div>
              <p className="text-sm text-muted-foreground">
                Made with 💜 by the Insightlytics Team
              </p>
            </div>
            
            <div className="flex gap-8">
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const StepCard = ({ number, icon, title, description, delay }: any) => (
  <div className={`text-center p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 ${delay}`}>
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
      {icon}
    </div>
    <div className="text-4xl font-bold text-primary mb-2">{number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const FeedbackResult = ({ text, category, urgency, impact }: any) => (
  <div className="p-4 rounded-lg border border-border bg-card hover:shadow-card transition-shadow">
    <p className="text-sm mb-3">{text}</p>
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary">{category}</Badge>
      <Badge className={urgency === "Urgent" ? "bg-destructive" : urgency === "Medium" ? "bg-[hsl(var(--ux))]" : "bg-muted"}>
        {urgency}
      </Badge>
      <Badge variant="outline">{impact}</Badge>
    </div>
  </div>
);

const DashboardCard = ({ title, icon, items }: any) => (
  <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item: string, i: number) => (
        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          {item}
        </li>
      ))}
    </ul>
  </Card>
);

const FlowStep = ({ icon, label }: any) => (
  <div className="flex flex-col items-center gap-3">
    <div className="p-4 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const IntegrationIcon = ({ icon, name, tooltip }: any) => (
  <div className="group relative">
    <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-110 cursor-pointer">
      <div className="text-primary mb-2">{icon}</div>
      <p className="text-sm font-medium">{name}</p>
    </div>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {tooltip}
    </div>
  </div>
);

const PersonaCard = ({ name, pain, impact }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
    <div>
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted-foreground">{pain}</p>
    </div>
    <Badge variant={impact === "Critical" ? "destructive" : impact === "High" ? "default" : "secondary"}>
      {impact}
    </Badge>
  </div>
);

export default Hero;
