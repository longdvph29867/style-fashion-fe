import CategoryTabs from "./CategoryTabs/CategoryTabs";
import SubCategoryList from "./SubCategoryList/SubCategoryList";

const CategoryList = () => {
  return (
    <div className="relative py-20 bg-neutral-100/70">
      <div className="container mx-auto">
        <h2 className="text-center text-[#222] mb-12 text-3xl font-semibold md:text-4xl 2xl:text-5xl">
          Bắt đầu khám phá
        </h2>
        <CategoryTabs />
        <SubCategoryList />
      </div>
    </div>
  );
};

export default CategoryList;
