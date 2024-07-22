import { https } from "../../../config/axios";
import Title from "../../Title/Title";
import PrimaryProductCard from "../../PrimaryProductCard/PrimaryProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../types/products";



const NewProductList = () => {
  const { data } = useQuery<Product[]>({
    queryKey: ["product-new"],
    queryFn: () => {
      return https
        .get("/products?limit=6")
        .then((response) => response.data.results);
    },
    staleTime:300000,
  });

   return (
     <div className="relative my-10 space-y-6 md:my-20 md:space-y-10">
       <Title
         title="Sản phẩm mới"
         content="Khám phá bộ sưu tập quần áo mới nhất"
       />
       <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
         {data?.map((product, index) => {
           return <PrimaryProductCard product={product} key={index} />;
         })}
       </div>
     </div>
   );
  };

 export default NewProductList;
