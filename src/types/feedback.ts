export interface FeedbackItem {
  id: string;
  content: string;
  category: 'bug' | 'feature' | 'ux' | 'pricing' | 'performance';
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: number; // 1-10
  impact: number; // 1-10
  source: string;
  createdAt: Date;
}
