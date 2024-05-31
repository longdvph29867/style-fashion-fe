type Props = {
  category: any;
};
const DepartmentCategoryItem: React.FC<Props> = ({ category }) => {
  // console.log(category);
  const { name } = category;
  return (
    <>
      <div>
        <div className="bg-indigo-100 rounded-2xl">
          <img
            width="398"
            height="434"
            className="object-cover rounded-2xl"
            sizes="400px"
            src="src/assets/img/department3.webp"
            alt=""
          />
        </div>
        <div className="flex-1 mt-5 text-center">
          <h2 className="text-base font-semibold sm:text-lg text-neutral-900 dark:text-neutral-100">
            {name}
          </h2>
          <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            20+ categories
          </span>
        </div>
      </div>
    </>
  );
};

export default DepartmentCategoryItem;
