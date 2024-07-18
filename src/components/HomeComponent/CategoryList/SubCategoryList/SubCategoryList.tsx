/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { https } from "../../../../config/axios";
import SubCategoryCart from "../SubCategoryCart/SubCategoryCart";

const SubCategoryList = () => 
  {
  const [categories, setCategories] = useState<any[]>([]);
  const fetchCategories = async () => {
    try {
      const response = await https.get("/categories")
      const allCategories = response.data.results
      const limitedCategories = allCategories.slice(0, 6)
      setCategories(limitedCategories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <SubCategoryCart
            key={index}
            category={{
              name: category.name,
              productCount: category.productCount || 0,
              thumbnail: category.imageUrl || "path/to/default-image.webp",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SubCategoryList;
