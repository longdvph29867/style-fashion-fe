import React from "react";
// import ItemProduct from "./ItemProduct";
import { Product } from "../../types/products"; // Import type Product từ types

type Props = {
  productsSame: Product[];
};

const ProductsSame: React.FC<Props> = ({ productsSame }) => {
  return (
    <div className="container mx-auto">
      <h2 className="mb-12 text-3xl font-semibold md:text-4xl">
        Sản phẩm cùng loại
      </h2>
      <div className="grid grid-cols-1 -mx-2 lg:-mx-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {productsSame.map((product, index) => (
          <div key={index} className="px-2 py-6 lg:px-6">
            {/* <ItemProduct product={product} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSame;
