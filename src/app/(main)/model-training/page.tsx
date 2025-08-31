import ModelTrainingForm from "@/components/model-train/model-training-form";
import React from "react";

const ModelTraining = () => {
  return (
    <section className="container mx-auto pl-12">
      <h1 className="text-3xl font-bold mb-2">Train Model</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Train a new model with your own images
      </p>
      <ModelTrainingForm />
    </section>
  );
};

export default ModelTraining;
