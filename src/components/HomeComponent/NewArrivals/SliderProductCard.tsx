import SliderProductCardItem from "./SliderProductCardItem";
import TitleNewArrivals from "./TitleNewArrivals";
import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
type Props = {
  gender?: string;
};

const SliderProductCard: React.FC<Props> = ({ gender }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      showSpinner();
      const API = `/products`;
      const { data } = await https.get(API);
      console.log(data.results);
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
       <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
      <TitleNewArrivals />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-20">
        
        {productsList?.map((product, index) => {
              return <SliderProductCardItem product={product} key={index} />;
            })}
      </div>
      <div className="border-b border-slate-200 dark:border-slate-700"></div>
    </div>
   
    </>
  );
};
export default SliderProductCard;
