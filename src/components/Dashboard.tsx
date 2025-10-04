import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Filter } from "lucide-react";
import FeedbackList from "@/components/FeedbackList";
import TopPriorities from "@/components/TopPriorities";
import UploadDialog from "@/components/UploadDialog";
import CategoryFilter from "@/components/CategoryFilter";
import { mockFeedbackData } from "@/data/mockFeedback";

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [feedbackData] = useState(mockFeedbackData);

  const filteredFeedback = selectedCategory === "all" 
    ? feedbackData 
    : feedbackData.filter(item => item.category === selectedCategory);

  const topPriorities = [...feedbackData]
    .sort((a, b) => (b.urgency + b.impact) - (a.urgency + a.impact))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Feedback Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {feedbackData.length} items analyzed
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setUploadDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Feedback
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Filter by:</span>
              </div>
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Feedback List */}
            <FeedbackList feedback={filteredFeedback} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TopPriorities priorities={topPriorities} />
          </div>
        </div>
      </div>

      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
