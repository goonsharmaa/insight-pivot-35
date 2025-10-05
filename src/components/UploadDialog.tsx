import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { FeedbackItem } from "@/types/feedback";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFeedbackAnalyzed: (feedback: FeedbackItem[]) => void;
}

const UploadDialog = ({ open, onOpenChange, onFeedbackAnalyzed }: UploadDialogProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const parseCSV = (text: string): { content: string; source: string }[] => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Skip header row if it exists
    const hasHeader = lines[0]?.toLowerCase().includes('content') || 
                      lines[0]?.toLowerCase().includes('feedback');
    const dataLines = hasHeader ? lines.slice(1) : lines;
    
    return dataLines.map(line => {
      // Handle CSV with quotes and commas
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches || matches.length < 1) {
        return null;
      }
      
      const fields = matches.map(field => {
        // Remove leading comma and quotes
        let cleaned = field.replace(/^,/, '').trim();
        if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
          cleaned = cleaned.slice(1, -1).replace(/""/g, '"');
        }
        return cleaned;
      });
      
      const content = fields[0] || '';
      const source = fields[1] || 'CSV Upload';
      
      if (!content.trim()) return null;
      
      return { content, source };
    }).filter((item): item is { content: string; source: string } => item !== null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "⚠️ Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Read CSV file
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        toast({
          title: "⚠️ Empty or invalid CSV",
          description: "Please upload a CSV with valid feedback columns (content, source)",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      // Call edge function to analyze feedback
      const { data, error } = await supabase.functions.invoke('analyze-feedback', {
        body: { feedbackItems: parsedData }
      });

      if (error) {
        console.error("Analysis error:", error);
        throw new Error(error.message || "Failed to analyze feedback");
      }

      if (!data?.analyzedFeedback) {
        throw new Error("No analysis results returned");
      }

      // Transform the analyzed feedback to match FeedbackItem type
      const analyzedFeedback: FeedbackItem[] = data.analyzedFeedback.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));

      // Pass analyzed feedback to parent
      onFeedbackAnalyzed(analyzedFeedback);

      toast({
        title: "✅ Feedback imported and analyzed!",
        description: `Successfully analyzed ${analyzedFeedback.length} feedback items`,
      });

      setIsUploading(false);
      onOpenChange(false);
      
      // Reset file input
      event.target.value = '';
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "⚠️ Analysis failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Upload Feedback
          </DialogTitle>
          <DialogDescription>
            Upload a CSV file with customer feedback. AI will automatically analyze and categorize each entry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <p className="text-sm font-medium text-primary">Analyzing feedback...</p>
                  <p className="text-xs text-muted-foreground">AI is categorizing and scoring your data</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload CSV</p>
                  <p className="text-xs text-muted-foreground">or drag and drop</p>
                </>
              )}
            </label>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">CSV Format:</p>
                <p className="text-muted-foreground">content, source</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Example:</strong>
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  "Login is slow", "Customer Survey"<br />
                  "Need dark mode", "In-App Feedback"
                </p>
              </div>
            </div>
            <a 
              href="/sample-feedback.csv" 
              download 
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              Download sample CSV
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
