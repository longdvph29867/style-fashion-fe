import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { hiddenSpinner, showSpinner } from "../../util/util";
import ProductsSame from "../../components/DetailComponent/ProductsSame";
import DescriptionDetail from "../../components/DetailComponent/DescriptionDetail";
import ReviewsDetail from "../../components/DetailComponent/ReviewsDetail";
import productService from "../../services/productService";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import InfoProduct from "./InfoProduct/InfoProduct";
import { Product } from "../../types/products";
import SkeletionList from "../../components/Skeletion/Skeletion";
const DetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const fetchProduct = async () => {
    try {
      showSpinner();
      const res = await productService.getProductBySlug(slug as string);
      const productDetail: Product = res.data;
      const listIdCategories = productDetail.categories.map((item) => item.id);
      const dataSameProduct = await productService.getProductByCategories(
        listIdCategories.join(",")
      );
      hiddenSpinner();
      setProduct(productDetail);
      const dataSameProductFilter = dataSameProduct.data.results.filter(
        (item: Product) => item.slug !== slug
      );
    } catch (error) {
      hiddenSpinner();
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
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
        <InfoProduct />

        <DescriptionDetail product={product} />
        <div className="container mx-auto mt-12">
          <hr />
          <div>
            <ReviewsDetail product={product} />
            <hr />
          </div>
        </div>
      </div>

      <div>{/* <ProductsSame productsSame={productsSame} /> */}</div>
    </div>
  );
};

export default DetailPage;
