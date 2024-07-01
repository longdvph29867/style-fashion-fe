// type Props = {}

import Banner from "../../components/HomeComponent/Banner";
// import DiscoverMoreSlider from "../../components/DiscoverMoreSlider";
import Banner2 from "../../components/HomeComponent/Banner2";
import HowItWork from "../../components/HomeComponent/HowItWork";
import ProductsList from "../../components/HomeComponent/ProductsList";
import ShoppingFeatures from "../../components/HomeComponent/ShoppingFeatures";
import SectionSliderProductCard from "../../components/HomeComponent/NewArrivals/SliderProductCard";
import Banner3 from "../../components/HomeComponent/banner3";
import BackgroundSection from "../../components/HomeComponent/ExploringByCategory.tsx/BackgroundSection";
import ExpertFavoritesList from "../../components/HomeComponent/ChooseByExperts/ExpertFavoritesList";
import DepartmentCategoryList from "../../components/HomeComponent/ChooseByDepartment/DepartmentCategoryList";
import Banner4 from "../../components/HomeComponent/banner4";
import SectionGridFeatureItems from "../../components/HomeComponent/SectionGridFeatureItems";
import SectionClientSay from "../../components/HomeComponent/SectionClientSay";
import DiscoverMoreSlider from "../../components/DiscoverMoreSlider/DiscoverMoreSlider";
const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <div className="container mx-auto">
        <DiscoverMoreSlider />
        <SectionSliderProductCard />
        <HowItWork />
        <BackgroundSection />
        <Banner3 />
        <BackgroundSection />
        <ProductsList />
        <Banner2 />
        <ExpertFavoritesList />
        <DepartmentCategoryList />
        <Banner4 />
        <SectionGridFeatureItems />
        <ProductsList gender="female" />
        {/* <ProductsList gender="male" /> */}
        <ShoppingFeatures className="container grid grid-cols-4 mx-auto mt-10" />
        {/* <BackgroundSection2 /> */}
        <SectionClientSay />
      </div>
    </div>
  );
};

export default HomePage;
