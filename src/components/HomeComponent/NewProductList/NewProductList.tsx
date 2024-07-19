import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/spinner";
import { https } from "../../../config/axios";
import Title from "../../Title/Title";
import PrimaryProductCard from "../../PrimaryProductCard/PrimaryProductCard";



const NewProductList = () => {
   const [productsList, setProductsList] = useState<Product[]>([]);
   const fetchData = async () => {
     try {
       showSpinner();
       const API = `/products?limit=6`;
       const { data } = await https.get(API);
       hiddenSpinner();
       setProductsList(data.results);
     } catch (error) {
       hiddenSpinner();
       console.log(error);
     }
   };
   useEffect(() => {
     fetchData();
   }, []);
   return (
     <div className="relative my-10 space-y-6 md:my-20 md:space-y-10">
       <Title
         title="Sản phẩm mới"
         content="Khám phá bộ sưu tập quần áo mới nhất"
       />
       <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
         {productsList?.map((product, index) => {
           return <PrimaryProductCard product={product} key={index} />;
         })}
       </div>
     </div>
   );
  };

 export default NewProductList;
