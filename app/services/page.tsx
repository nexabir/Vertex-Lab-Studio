import { Eyebrow } from "@/components/Eyebrow";
import { ServicesGrid } from "@/components/ServicesGrid";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <Eyebrow>Full catalog</Eyebrow>
      <h1 className="font-display text-[36px] sm:text-[44px] font-medium text-ink mb-5 max-w-[640px]">
        Every product, organized by what it solves.
      </h1>
      <p className="font-body text-[15px] leading-relaxed text-muted max-w-[540px] mb-12">
        Add as many services as your project needs — your selections carry over to a single
        guided request.
      </p>
      <ServicesGrid services={services} />
    </div>
  );
}
