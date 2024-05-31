import DepartmentCategoryItem from "./DepartmentCategoryItem";
import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";

type Props = {
  gender?: string;
};

const DepartmentCategoryList: React.FC<Props> = () => {
  const [categoryList, setCategoryList] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      showSpinner();
      const API = `/categories`;
      const { data } = await https.get(API);
      console.log(data.results);
      hiddenSpinner();
      setCategoryList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const toggleExpanded = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <>
      <div className="mt-24 nc-SectionSliderCategories">
        <div className="relative flex flex-col justify-between mb-12 nc-Section-Heading sm:flex-row sm:items-end lg:mb-14 text-neutral-900 dark:text-neutral-50">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Shop by department
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-7">
          {categoryList?.map((category, index) => {
            return <DepartmentCategoryItem category={category} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DepartmentCategoryList;
