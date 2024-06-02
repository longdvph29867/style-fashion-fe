// type Props = {}

import Banner from "../../components/Banner";
// import DiscoverMoreSlider from "../../components/DiscoverMoreSlider";
import Banner2 from "../../components/Banner2";
import HowItWork from "../../components/HowItWork";
import ProductsList from "../../components/ProductsList";
import ShoppingFeatures from "../../components/ShoppingFeatures";
import SectionSliderProductCard from "../../components/SectionSliderProductCard";
import Banner3 from "../../components/banner3";
import BackgroundSection from "../../components/BackgroundSection";
import SectionSliderLargeProduct from "../../components/SectionSliderLargeProduct";
import SectionSliderCategories from "../../components/SectionSliderCategories";
import Banner4 from "../../components/banner4";
import SectionGridFeatureItems from "../../components/SectionGridFeatureItems";
import BackgroundSection2 from "../../components/BackgroundSection2";
import SectionClientSay from "../../components/SectionClientSay";
import DiscoverMoreSlider from "../../components/DiscoverMoreSlider/DiscoverMoreSlider";
const HomePage = () => {
  console.log(1);

  return (
    <div className=" ">
      <Banner />
      <div className="container mx-auto">
        <DiscoverMoreSlider />
        <SectionSliderProductCard />
        <HowItWork />
        <Banner3 />
        <BackgroundSection />
        <ProductsList />
        <Banner2 />
        <SectionSliderLargeProduct />
        <SectionSliderCategories />
        <Banner4 />
        <SectionGridFeatureItems />
        <ProductsList gender="female" />
        {/* <ProductsList gender="male" /> */}
        <ShoppingFeatures className="container mx-auto grid grid-cols-4 mt-10" />
        {/* <BackgroundSection2 /> */}
        <SectionClientSay />
      </div>
    </div>
  );
};

export default HomePage;
