import Link from "next/link";
import { RaysMark } from "./RaysMark";
import { getSiteContact } from "@/lib/data";

export async function Footer() {
  const contact = await getSiteContact();

  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <RaysMark size={28} hubColor="#F5F3EE" />
            <span className="font-display text-[16px] font-semibold">Vertex Lab Studio</span>
          </div>
          <p className="font-body text-[14px] text-cream/60 max-w-[320px] leading-relaxed">
            Where business problems meet engineered solutions.
          </p>
        </div>
        <div>
          <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-cream/40 mb-4">
            Explore
          </p>
          <ul className="space-y-2.5 font-body text-[14px] text-cream/70">
            <li><Link href="/services" className="hover:text-cream">Services</Link></li>
            <li><Link href="/combos" className="hover:text-cream">Combos</Link></li>
            <li><Link href="/portfolio" className="hover:text-cream">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-cream">Blog</Link></li>
            <li><Link href="/request" className="hover:text-cream">Start a request</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-cream/40 mb-4">
            Contact
          </p>
          <ul className="space-y-2.5 font-body text-[14px] text-cream/70">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-cream">{contact.email}</a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`} className="hover:text-cream">{contact.phone}</a>
            </li>
            {contact.address && <li className="text-cream/50">{contact.address}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="max-w-content mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-body text-[12px] text-cream/40">
            © {new Date().getFullYear()} Vertex Lab Studio. All rights reserved.
          </p>
          <p className="font-body text-[12px] text-cream/40">VLS</p>
        </div>
      </div>
    </footer>
  );
}
