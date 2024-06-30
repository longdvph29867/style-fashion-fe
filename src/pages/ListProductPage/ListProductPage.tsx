import React, { useEffect, useState } from "react";
import { https } from "../../services/config";
import { useLocation } from "react-router-dom";
import ItemProduct from "../../components/HomeComponent/ItemProduct";
import { hiddenSpinner, showSpinner } from "../../util/util";

const ListProductPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slugCategory = queryParams.get("category");

  const [productsList, setProductsList] = useState<Product[]>([]);

  const fetchData = async () => {
    showSpinner();
    try {
      const API = slugCategory
        ? `/products?category=${slugCategory}`
        : "/products";
      const { data } = await https.get(API);

      setProductsList(data.data);
      hiddenSpinner();
    } catch (error) {
      console.log(error);
      hiddenSpinner();
    }
  };
  useEffect(() => {
    fetchData();
  }, [slugCategory]);

  return (
    <div className="py-20">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Bộ sưu tập quần áo
        </h2>
        <span className="block mt-4 text-sm text-neutral-500 sm:text-base lg:w-1/2">
          Các bộ sưu tập quần áo thời trang mới nhất trong năm 2023 Dạo Phố cực
          đẹp, cao cấp dành cho nam nữ
        </span>
        <hr className="border-slate-200 my-14" />
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3">
          {/*  */}
          <div className="col-span-1 pr-4">
            <div>
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold ">Danh mục</h3>
                <div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="Hoodie"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="Hoodie" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Áo Nỉ &amp; Hoodie
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="Cardigan"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="Cardigan" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Áo Len &amp; Áo Cardigan
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="Thun"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="Thun" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Áo Thun
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="coats"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="coats" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Áo Khoác
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="Polo"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="Polo" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Áo Polo
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold ">Size</h3>
                <div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="sizeS"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="sizeS" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        S
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="sizeM"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="sizeM" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        M
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="sizeL"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="sizeL" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        L
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="sizeXL"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="sizeXL" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        XL
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="size2XL"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="size2XL" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        2XL
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col py-8 space-y-4 border-b border-transparent">
                <h3 className="font-semibold ">Màu sắc</h3>
                <div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="sizeS"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="sizeS" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Trắng
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="red"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="red" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Đỏ
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="blue"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="blue" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Xanh dương
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="yellow"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="yellow" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Vàng
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4 text-sm sm:text-base">
                    <input
                      id="pink"
                      className="w-5 h-5 rounded "
                      type="checkbox"
                      name=""
                    />
                    <label htmlFor="pink" className="pl-2.5 sm:pl-3.5">
                      <span className="text-sm font-normal text-slate-900">
                        Hông
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* list */}
          <div className="grid lg:col-span-3 md:col-span-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
            {/* item */}
            {productsList.map((product, index) => (
              <ItemProduct key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;
