import { useParams } from "react-router-dom";
import DescriptionDetail from "../../components/DetailComponent/DescriptionDetail";
import ReviewsDetail from "../../components/DetailComponent/ReviewsDetail";
import productService from "../../services/productService";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import InfoProduct from "./InfoProduct/InfoProduct";
import SkeletionList from "../../components/Skeletion/Skeletion";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { visilibitySpiner } from "../../util/util";
const DetailPage = () => {
  const { slug } = useParams<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["product-detail"],
    queryFn: () =>
      productService.getProductBySlug(slug as string).then((res) => res.data),
    staleTime: 3 * 60 * 1000, // quá 3 phút sẽ gọi lại api
    enabled: !!slug, // khi nào có slug thì mới gọi api
  });
  useEffect(() => {
    visilibitySpiner(isLoading);
  }, []);
  const listBreadcrumb = [
    {
      label: "Chi tiết sản phẩm",
    },
  ];

  return (
    <div>
      <Breadcrumb list={listBreadcrumb} />
      {/* <SkeletionList value={3} rows={2} height={200} /> */}
      <div className="py-12">
        <InfoProduct product={data} />

        <DescriptionDetail product={data} />
        <div className="container mx-auto mt-12">
          <hr />
          <div>
            <ReviewsDetail product={data} />
            <hr />
          </div>
        </div>
      </div>

      <div>{/* <ProductsSame productsSame={productsSame} /> */}</div>
    </div>
  );
};

export default DetailPage;
