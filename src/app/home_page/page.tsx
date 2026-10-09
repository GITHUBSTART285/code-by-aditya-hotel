
import HeroSection from "@/components/organisms/HeroSection";
import BookingSearch from "@/components/organisms/BookingSearch";
import FeaturedRooms from "@/components/organisms/FeaturedRooms";
import Facilities from "@/components/organisms/Facilities";
import Gallery from "@/components/organisms/Gallery";
//import GalleryGrid from "@/components/organisms/Gallerygrid";
import Testimonials from "@/components/organisms/Testimonials";

export default function Home() {
  return (
    <>
      
 <HeroSection />
 <BookingSearch/>
  <FeaturedRooms />
  <Facilities />
  < Gallery />
  < Testimonials />
  
      
        
      
    </>
  );
}