import Banner from "../../components/HomeComponent/Banner/Banner";
import HotProductList from "../../components/HomeComponent/HotProductList/HotProductsList";
import SectionClientSay from "../../components/HomeComponent/SectionClientSay/SectionClientSay";
import CategorySlider from "../../components/HomeComponent/CategorySlider/CategorySlider";
import CategoryList from "../../components/HomeComponent/CategoryList/CategoryList";
import BannerThird from "../../components/HomeComponent/BannerThird/BannerThird";
import NewProductList from "../../components/HomeComponent/NewProductList/NewProductList";
import BannerFourth from "../../components/HomeComponent/BannerFourth/BannerFourth";
import TrendingProducts from "../../components/HomeComponent/TrendingProducts/TrendingProducts";
const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="container mx-auto">
        {/* <CategorySlider /> */}
        <HotProductList />
      </div>
      <CategoryList />
      <div className="container mx-auto">
        <BannerThird />
        <NewProductList />
        <BannerFourth />
        <TrendingProducts />
        <SectionClientSay />
      </div>
    </>
  );
};

export default HomePage;
