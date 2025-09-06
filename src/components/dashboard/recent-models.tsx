import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Database } from "@database.types";
import { Badge } from "../ui/badge";

interface RecnetModelProps {
  models: Database["public"]["Tables"]["models"]["Row"][];
}

const RecentModels = ({ models }: RecnetModelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium tracking-tight">
          Recent Models
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-4">
          {!models || models.length === 0 ? (
            <Card className="border-dashed py-10 text-center">
              <CardContent>
                <p className="text-base text-muted-foreground">
                  No models trained yet. Start by training your first one.
                </p>
              </CardContent>
            </Card>
          ) : (
            models.map((model) => (
              <Card
                key={model.id}
                className="flex items-center justify-between p-4 hover:shadow-md transition-shadow rounded-xl"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {model.model_name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {model.gender}
                  </p>
                </div>
                <Badge variant={getStatusVariant(model?.training_status ?? "")}>
                  {model.training_status}
                </Badge>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentModels;

function getStatusVariant(status: string) {
  switch (status) {
    case "succeeded":
      return "default";
    case "processing":
    case "starting":
      return "secondary";
    case "failed":
    case "canceled":
      return "destructive";
    default:
      return "secondary";
  }
}
