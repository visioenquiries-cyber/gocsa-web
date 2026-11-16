import { notFound } from "next/navigation";
import { getContentSource } from "../../../content/homepage/source";
import { isLocale } from "@gocsa/cms";
import { Hero } from "../../../components/home/Hero";
import { Heritage, Independence, WhoWeAre, WhyChoose } from "../../../components/home/Story";
import { CareJourney, Funding, Services } from "../../../components/home/Services";
import { Contact, Faqs, Policies, Testimonials } from "../../../components/home/Trust";
import { CareChooser } from "../../../components/home/CareChooser";
import { MediaChapter } from "../../../components/site/MediaChapter";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Paths the locale middleware skips (anything with a file extension) land here as a single
  // segment. Without this guard an unknown "locale" silently fell back to en and served a
  // duplicate of the homepage at 200 — e.g. /nope.txt — so unknown locales must 404.
  if (!isLocale(locale)) notFound();
  const home = await getContentSource().getHomepage(locale);

  return (
    <>
      <Hero content={home.hero} />
      <Heritage content={home.heritage} />
      <WhoWeAre content={home.whoWeAre} />
      <CareChooser content={home.careChooser} />
      <MediaChapter content={home.careInMotion} />
      <Services content={home.services} />
      <Independence content={home.independence} />
      <CareJourney content={home.careJourney} />
      <Funding content={home.funding} />
      <WhyChoose content={home.whyChoose} />
      <Testimonials content={home.testimonials} />
      <Policies content={home.policies} />
      <Faqs content={home.faqs} />
      <Contact content={home.contact} />
    </>
  );
}
