import ExpertFavoritesItem from "./ExpertFavoritesItem";
import ExpertFavoritesTitle from "./ExpertFavoritesTitle";
import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
type Props = {
  gender?: string;
};
const ExpertFavoritesList: React.FC<Props> = () => {
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
  // const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const toggleExpanded = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <>
      <div className="mt-24 nc-SectionSliderLargeProduct">
        <ExpertFavoritesTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {productsList?.map((product, index) => {
            return <ExpertFavoritesItem product={product} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ExpertFavoritesList;
