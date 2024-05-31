import CategoryFilter from "./CategoryFilter";
import ExploringCategoryList from "./ExploringCategoryList";
// import './YourComponent.css'; // Import CSS file

const BackgroundSection = () => {
  return (
    <>
      <div className="relative py-24 mb-40 lg:py-32">
        <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1500px]  left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100/70 dark:bg-black/20"></div>
        <div className="relative nc-SectionGridMoreExplore ">
          <CategoryFilter />
          <div>
            <ExploringCategoryList />
          </div>
        </div>
      </div>
    </>
  );
};
export default BackgroundSection;
