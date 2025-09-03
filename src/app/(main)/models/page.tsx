import { fetchModels } from "@/app/actions/model-actions";
import ModelsList from "@/components/models/models-list";
import React from "react";

const Models = async () => {
  const data = await fetchModels();

  return (
    <section className="container mx-auto pl-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Models</h1>
        <p className="text-sm text-muted-foreground mb-6">
          View and manage your trained models
        </p>
      </div>
      <ModelsList models={data}/>
    </section>
  );
};

export default Models;
