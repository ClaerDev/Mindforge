"use client";

import { Database } from "@database.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Loader,
  Trash2,
  User2,
  XCircle,
} from "lucide-react";
import { formatDistance } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useId } from "react";
import { deleteModel } from "@/app/actions/model-actions";
import { cn } from "@/lib/utils";

type ModelType = {
  error: string | null;
  success: boolean;
  data: Database["public"]["Tables"]["models"]["Row"][] | null;
};

interface ModelsListProps {
  models: ModelType;
}

interface HandleDeleteParams {
  id: number;
  model_id: string;
  model_version: string;
}
const ModelsList = ({ models }: ModelsListProps) => {
  const { data } = models;

  const toastId = useId();

  const handleDeleteModel = async ({
    id,
    model_id,
    model_version,
  }: HandleDeleteParams): Promise<void> => {
    toast.loading("Deleting model...", { id: toastId });

    const { success, error } = await deleteModel(id, model_id, model_version);

    if (error) {
      toast.error(error, { id: toastId });
    }
    if (success) {
      toast.success("Model deleted successfully!", { id: toastId });
    }
  };

  if (data?.length === 0) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Card className="p-8 text-center shadow-xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-col items-center space-y-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-inner">
              <Bot size={34} strokeWidth={2} />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              No Models Found
            </CardTitle>
            <CardDescription className="text-gray-600 text-base leading-relaxed max-w-sm">
              You haven’t trained any models yet. Start by creating and training
              a new one to unlock powerful AI features.
            </CardDescription>
            <Link href="/model-training" className="pt-3">
              <Button className="w-fit rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-out">
                🚀 Train a Model
              </Button>
            </Link>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((model) => (
        <Card
          key={model.id}
          className="flex flex-col justify-between p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-xl  transition-all"
        >
          <CardHeader className="p-0 flex flex-col items-start space-y-2">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {model.model_name}
              </CardTitle>

              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  {model.training_status === "succeeded" ? (
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="capitalize">Ready</span>
                    </div>
                  ) : model.training_status === "failed" ||
                    model.training_status === "canceled" ? (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <XCircle className="w-4 h-4" />
                      <span className="capitalize">
                        {model.training_status}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="capitalize">Training</span>
                    </div>
                  )}
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black border border-red-500/30 shadow-xl shadow-red-500/20 rounded-2xl text-red-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg font-bold text-red-400 flex items-center gap-2">
                        ⚠ Delete Model
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm text-red-300/80">
                        Are you sure you want to delete this model? <br />
                        <span className="text-red-200 font-medium">
                          This action cannot be undone.
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-3">
                      <AlertDialogCancel className="bg-zinc-900 border border-red-500/20 text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all rounded-lg">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDeleteModel({
                            id: model.id,
                            model_id: model.model_id ?? "",
                            model_version: model.version || "",
                          })
                        }
                        className="bg-red-500 text-black font-semibold hover:bg-red-400 transition-all rounded-lg shadow-md shadow-red-500/50"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <CardDescription className="text-sm text-gray-500">
              Created{" "}
              {formatDistance(new Date(model.created_at), new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 p-0 pt-3">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 t-4" />
                    <span>Training Duration</span>
                  </div>
                  <p className="mt-1 font-medium">
                    {Math.round(Number(model.training_time) / 60) || NaN} mins
                  </p>
                </div>

                <div className="rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User2 className="w-4 t-4" />
                    <span>Gender</span>
                  </div>
                  <p className="font-medium mt-1">
                    <span className="capitalize">{model.gender}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="pt-4">
            <Link
              href={
                model.training_status === "succeeded"
                  ? `/image-generation?model_id=${model.model_id}:${model.version}`
                  : "#"
              }
              className={cn(
                "inline-flex w-full group",
                model.training_status !== "succeeded" &&
                  "pointer-events-none opacity-50"
              )}
            >
              <Button
                size="sm"
                className="w-full group-hover:bg-primary/90 cursor-pointer"
                disabled={model.training_status !== "succeeded"}
              >
                Generate Images <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModelsList;
