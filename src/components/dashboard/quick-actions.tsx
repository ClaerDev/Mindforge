import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Layers, Wallet, Wand2Icon } from "lucide-react";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium tracking-tight">
          Quick Actions
        </CardTitle>
        <CardDescription>Get started with common actions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild className="w-full">
          <Link href={"/image-generation"}>
            <Wand2Icon className="mr-2 w-4 h-4" /> Generate Image
          </Link>
        </Button>

        <Button asChild className="w-full" variant={"destructive"}>
          <Link href={"/model-training"}>
            <Layers className="mr-2 w-4 h-4" /> Train new model
          </Link>
        </Button>

        <Button asChild className="w-full" variant={"secondary"}>
          <Link href={"/billing"}>
            <Wallet className="mr-2 w-4 h-4" /> Billing
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
