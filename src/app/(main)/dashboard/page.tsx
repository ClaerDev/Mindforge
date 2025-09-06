import { getCredits } from "@/app/actions/credit-action";
import { fetchImages } from "@/app/actions/image-actions";
import { fetchModels } from "@/app/actions/model-actions";
import RecentImages from "@/components/dashboard/recent-images";
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
  const displayName = user?.user_metadata?.fullName || "Creator";

  return (
    <section className="container mx-auto flex-1 space-y-8 pl-14">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome back, {displayName}
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to keep building something amazing today?
          </p>
        </div>
      </div>

      <StatsCard
        imageCount={imageCount}
        modelCount={modelCount}
        credits={credits}
      />

      <div className="grid gap-6 grid-cols-4">
        <RecentImages images={images?.slice(0, 6) ?? []} />
        quick actions
      </div>
    </section>
  );
}
