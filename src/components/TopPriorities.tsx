import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import type { FeedbackItem } from "@/types/feedback";

interface TopPrioritiesProps {
  priorities: FeedbackItem[];
}

const TopPriorities = ({ priorities }: TopPrioritiesProps) => {
  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Top 10 Priorities</h2>
      </div>

      <div className="space-y-3">
        {priorities.map((item, index) => {
          const priorityScore = item.urgency + item.impact;
          
          return (
            <div 
              key={item.id}
              className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2 mb-2">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className={`text-xs font-semibold ${
                      priorityScore >= 18 ? "text-red-600" :
                      priorityScore >= 15 ? "text-amber-600" :
                      "text-green-600"
                    }`}>
                      {priorityScore}/20
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TopPriorities;
