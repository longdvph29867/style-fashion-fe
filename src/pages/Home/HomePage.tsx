import Banner from "../../components/HomeComponent/Banner/Banner";
import HowItWork from "../../components/HomeComponent/HowItWork/HowItWork";
import ShoppingFeatures from "../../components/HomeComponent/ShoppingFeatures/ShoppingFeatures";
import HotProductList from "../../components/HomeComponent/HotProductList/HotProductsList";
import SectionClientSay from "../../components/HomeComponent/SectionClientSay/SectionClientSay";
import CategorySlider from "../../components/HomeComponent/CategorySlider/CategorySlider";
import CategoryList from "../../components/HomeComponent/CategoryList/CategoryList";
// import BannerSecond from "../../components/HomeComponent/BannerSecond/BannerSecond";
import BannerThird from "../../components/HomeComponent/BannerThird/BannerThird";
import NewProductList from "../../components/HomeComponent/NewProductList/NewProductList";
import BannerFourth from "../../components/HomeComponent/BannerFourth/BannerFourth";
import TrendingProducts from "../../components/HomeComponent/TrendingProducts/TrendingProducts";
const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="container mx-auto">
        <CategorySlider />
        <HotProductList />
        <HowItWork />
      </div>
      <CategoryList />

      <div className="container mx-auto">
        {/* <BannerSecond /> */}
        <BannerThird />
        <ShoppingFeatures />
        <NewProductList />
        <BannerFourth />
        <TrendingProducts />
        <SectionClientSay />
      </div>
    </>
  );
};

export default HomePage;
