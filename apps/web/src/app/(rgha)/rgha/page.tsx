import { rghaHomepage as home } from "../../../content/rgha/homepage";
import { Hero } from "../../../components/home/Hero";
import { Heritage, Independence, WhoWeAre, WhyChoose } from "../../../components/home/Story";
import { CareJourney, Funding, Services } from "../../../components/home/Services";
import { Contact, Faqs, Policies, Testimonials } from "../../../components/home/Trust";
import { CareChooser } from "../../../components/home/CareChooser";
import { GallerySection } from "../../../components/home/GallerySection";
import { MediaChapter } from "../../../components/site/MediaChapter";

export default function RghaHomePage() {
  return (
    <>
      <Hero content={home.hero} />
      <Heritage content={home.heritage} />
      <WhoWeAre content={home.whoWeAre} />
      <CareChooser content={home.careChooser} />
      {home.gallery ? <GallerySection content={home.gallery} /> : null}
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
