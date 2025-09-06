import { Database } from "@database.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImageIcon, Layers, Wallet2, ZapIcon } from "lucide-react";

interface StatsCardProps {
  imageCount: number;
  modelCount: number;
  credits: Database["public"]["Tables"]["credits"]["Row"] | null;
}

const StatsCard = ({ imageCount, modelCount, credits }: StatsCardProps) => {
  const cards = [
    {
      title: "Total Images",
      value: imageCount,
      description: "Images generated so far",
      icon: <ImageIcon className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: "Total Models",
      value: modelCount,
      description: "Custom models trained so far",
      icon: <Layers className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "Image Credits",
      value: `${credits?.image_generation_count || 0}/${credits?.max_image_generation_count || 0}`,
      description: "Available image generation credits",
      icon: <Wallet2 className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Model Training Credits",
      value: `${credits?.model_training_count || 0}/${credits?.max_model_training_count || 0}`,
      description: "Available model training credits",
      icon: <ZapIcon className="h-5 w-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <Card
          key={i}
          className="group relative overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight">
              {card.title}
            </CardTitle>
            <div className="p-2 rounded-lg bg-muted group-hover:bg-accent/20 transition-colors">
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{card.value}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {card.description}
            </p>
          </CardContent>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-accent/5 pointer-events-none" />
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
