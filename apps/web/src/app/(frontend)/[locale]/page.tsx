import { getContentSource } from "../../../content/homepage/source";
import { isLocale } from "@gocsa/cms";
import { Hero } from "../../../components/home/Hero";
import { Heritage, Independence, WhoWeAre, WhyChoose } from "../../../components/home/Story";
import { CareJourney, Funding, Services } from "../../../components/home/Services";
import { Contact, Faqs, Policies, Testimonials } from "../../../components/home/Trust";
import { MediaChapter } from "../../../components/site/MediaChapter";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const home = await getContentSource().getHomepage(loc);

  return (
    <>
      <Hero content={home.hero} />
      <Heritage content={home.heritage} />
      <WhoWeAre content={home.whoWeAre} />
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
