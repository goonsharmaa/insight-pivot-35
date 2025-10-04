import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb, Layout, DollarSign, Zap } from "lucide-react";
import type { FeedbackItem } from "@/types/feedback";

interface FeedbackListProps {
  feedback: FeedbackItem[];
}

const categoryConfig = {
  bug: { 
    icon: AlertCircle, 
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    label: "Bug"
  },
  feature: { 
    icon: Lightbulb, 
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    label: "Feature"
  },
  ux: { 
    icon: Layout, 
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    label: "UX"
  },
  pricing: { 
    icon: DollarSign, 
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    label: "Pricing"
  },
  performance: { 
    icon: Zap, 
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    label: "Performance"
  },
};

const sentimentConfig = {
  positive: "bg-green-500/10 text-green-600 border-green-500/20",
  neutral: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  negative: "bg-red-500/10 text-red-600 border-red-500/20",
};

const FeedbackList = ({ feedback }: FeedbackListProps) => {
  return (
    <div className="space-y-4">
      {feedback.map((item) => {
        const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig];
        const Icon = categoryInfo.icon;
        const priorityScore = item.urgency + item.impact;

        return (
          <Card key={item.id} className="p-6 hover:shadow-elegant transition-shadow duration-200">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={categoryInfo.color}>
                  <Icon className="w-3 h-3 mr-1" />
                  {categoryInfo.label}
                </Badge>
                <Badge variant="outline" className={sentimentConfig[item.sentiment]}>
                  {item.sentiment}
                </Badge>
              </div>
              <div className="flex gap-2 shrink-0">
                <ScoreBadge label="Urgency" value={item.urgency} />
                <ScoreBadge label="Impact" value={item.impact} />
              </div>
            </div>

            <p className="text-foreground mb-3 leading-relaxed">{item.content}</p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Source: {item.source}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Priority:</span>
                <span className={`font-semibold ${
                  priorityScore >= 18 ? "text-red-600" :
                  priorityScore >= 15 ? "text-amber-600" :
                  "text-green-600"
                }`}>
                  {priorityScore}/20
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const ScoreBadge = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-secondary">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}/10</span>
    </div>
  );
};

export default FeedbackList;
