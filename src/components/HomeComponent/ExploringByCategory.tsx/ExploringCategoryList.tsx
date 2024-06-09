import { useEffect, useState } from "react";
import CategoryListItem from "./CategoryListItem";
import { https } from "../../../config/axios"; // Đảm bảo rằng bạn đã cấu hình axios đúng cách

const ExploringCategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await https.get('/categories'); // API của bạn
      const allCategories = response.data.results;
      const limitedCategories = allCategories.slice(0, 6); // Chỉ lấy 6 danh mục đầu tiên
      setCategories(limitedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 gap-7 md:grid-cols-2 xl:grid-cols-3">     
        {categories.map((category, index) => (
          <CategoryListItem 
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
}

export default ExploringCategoryList;
