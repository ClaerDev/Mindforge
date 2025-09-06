import { getCredits } from "@/app/actions/credit-action";
import { fetchImages } from "@/app/actions/image-actions";
import { fetchModels } from "@/app/actions/model-actions";
import StatsCard from "@/components/dashboard/stats-user";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supaabse = await createClient();
  const {
    data: { user },
  } = await supaabse.auth.getUser();

  const { data: models, count: modelCount } = await fetchModels();

  const { data: credits } = await getCredits();
  const { data: images } = await fetchImages();

  const imageCount = images?.length || 0;

  return (
    <section className="container mx-auto flex-1 space-y-6 pl-14">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.user_metadata?.fullName}{" "}
        </h2>
      </div>
      <StatsCard
        imageCount={imageCount}
        modelCount={modelCount}
        credits={credits}
      />
    </section>
  );
}
