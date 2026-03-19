import CarouselBanner from "../components/CarouselBanner";
import "../css/CarouselBanner.css";
import OurServices from "../components/OurServices";
import DidYouKnow from "../components/DidYouKnow";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <>
      <CarouselBanner />
      <OurServices />
      <DidYouKnow />
      <ContactForm />
    </>
  );
};

export default Home;