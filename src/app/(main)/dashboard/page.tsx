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

  const { count: modelCount } = await fetchModels();
  const { data: credits } = await getCredits();
  const { data: images } = await fetchImages();

  const imageCount = images?.length || 0;
  const displayName = user?.user_metadata?.fullName || "Creator";

  return (
    <section className="container mx-auto flex-1 space-y-8 pl-14">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Welcome back,{" "}
            <span className="text-gray-700 font-semibold">{displayName}</span>
          </h2>
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
