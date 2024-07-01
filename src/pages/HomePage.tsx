// type Props = {}

import Banner from "../components/HomeComponent/Banner";
import DiscoverMoreSlider from "../components/HomeComponent/DiscoverMoreSlider";
import Banner2 from "../components/HomeComponent/Banner2";
import HowItWork from "../components/HomeComponent/HowItWork";
import ProductsList from "../components/HomeComponent/ProductsList";
import ShoppingFeatures from "../components/HomeComponent/ShoppingFeatures";
import BackgroundSection from "../components/HomeComponent/ExploringByCategory.tsx/BackgroundSection";
import Banner4 from "../components/HomeComponent/banner4";
import SectionGridFeatureItems from "../components/HomeComponent/SectionGridFeatureItems";
import SectionClientSay from "../components/HomeComponent/SectionClientSay";
import ExpertFavoritesList from "../components/HomeComponent/ChooseByExperts/ExpertFavoritesList";
import DepartmentCategoryList from "../components/HomeComponent/ChooseByDepartment/DepartmentCategoryList";
import SliderProductCard from "../components/HomeComponent/NewArrivals/SliderProductCard";
const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <div className="container mx-auto">
        <DiscoverMoreSlider />
        <SliderProductCard />
        <HowItWork />
        {/* <Banner3 /> */}
        <BackgroundSection />
        <ProductsList />
        <Banner2 />
        <ExpertFavoritesList />
        <DepartmentCategoryList />
        <Banner4 />
        <SectionGridFeatureItems />
        <ProductsList />
        {/* <ProductsList gender="male" /> */}
        <ShoppingFeatures className="container grid grid-cols-4 mx-auto mt-10" />
        {/* <BackgroundSection2 /> */}
        <SectionClientSay />
      </div>
    </div>
  );
};

export default HomePage;
