import { Eyebrow } from "@/components/Eyebrow";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { getPortfolioProjects } from "@/lib/data";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[700px] mb-12">
        <Eyebrow>Selected Case Studies</Eyebrow>
        <h1 className="font-display text-[36px] sm:text-[46px] font-semibold text-ink mb-4 tracking-tight leading-tight">
          Engineered solutions for complex business operations.
        </h1>
        <p className="font-body text-[16px] leading-relaxed text-muted">
          Explore how Vertex Lab Studio turns operational bottlenecks into custom BI dashboards, scalable ERP platforms, and high-conversion web applications.
        </p>
      </div>

      <PortfolioShowcase projects={projects} />

      {/* Bottom CTA */}
      <div className="mt-20 p-10 md:p-14 rounded-2xl bg-ink text-cream border border-line flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="max-w-[520px]">
          <h2 className="font-display text-[26px] md:text-[32px] font-semibold text-cream mb-3">
            Have an operational challenge of your own?
          </h2>
          <p className="font-body text-[15px] text-cream/65 leading-relaxed">
            Write down what isn&rsquo;t working. We&rsquo;ll review your brief and deliver a tailored scope and architecture plan within 48 hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
          <Button href="/problem-tracker" variant="secondary" size="lg">
            Diagnose Problem First
          </Button>
          <Button href="/request" size="lg">
            Start a Request <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
