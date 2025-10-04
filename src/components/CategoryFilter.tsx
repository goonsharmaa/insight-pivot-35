import { Button } from "@/components/ui/button";
import { AlertCircle, Lightbulb, Layout, DollarSign, Zap, Grid } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: "all", label: "All", icon: Grid },
  { id: "bug", label: "Bugs", icon: AlertCircle },
  { id: "feature", label: "Features", icon: Lightbulb },
  { id: "ux", label: "UX", icon: Layout },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "performance", label: "Performance", icon: Zap },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category.id)}
            className={isSelected ? "bg-primary hover:bg-primary/90" : ""}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
