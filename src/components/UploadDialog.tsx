import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: "Your feedback is being analyzed by AI. This may take a moment.",
      });
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Feedback</DialogTitle>
          <DialogDescription>
            Upload a CSV file with customer feedback. Each row should contain feedback text and source.
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
                  <p className="text-sm text-muted-foreground">Processing...</p>
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

          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">CSV Format:</p>
                <p className="text-muted-foreground">content, source</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Example: "Login is slow", "Customer Survey"
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
