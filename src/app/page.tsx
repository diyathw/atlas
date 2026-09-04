import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import TrustRow from "@/components/TrustRow";
import StatBand from "@/components/StatBand";
import Services from "@/components/Services";
import Quality from "@/components/Quality";
import Industries from "@/components/Industries";
import About from "@/components/About";
import ProcessBand from "@/components/ProcessBand";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

const showStatBand = true;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col [&_[id]]:scroll-mt-20">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <TrustRow />
        {showStatBand && <StatBand />}
        <Services />
        <Quality />
        <Industries />
        <About />
        <ProcessBand />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
