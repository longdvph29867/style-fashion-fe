import React from "react";
import ItemProductList from "./ItemProductList";
import CheckBox from "./CheckBox";

type Props = {};

const ProductListPage = (props: Props) => {
  return (
    <div className="py-20 px-10 shrink-0">
      <div className="">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Bộ sưu tập quần áo
        </h2>
        <span className="block mt-4 text-neutral-500 text-sm sm:text-base lg:w-1/2">
          Các bộ sưu tập quần áo thời trang mới nhất trong năm 2023 Dạo Phố cực
          đẹp, cao cấp dành cho nam nữ
        </span>
        <hr className="border-slate-200 mt-12 md:my-12" />
        <div className="flex justify-end items-center mb-6">
          <button
            className="flex relative items-center justify-center md:hidden mt-4 select-none rounded-lg bg-green-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45V858L211 365q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"
                fill="#ffffff"
                className="fill-000000"
              ></path>
            </svg>
            {/* <!-- <span className="absolute text-[12px] bottom-1 right-1">Lọc</span> --> */}
          </button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10">
          <div className="hidden md:block col-span-1 pr-4">
            <div>
              {/* <!-- Danhmuc --> */}
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold">Danh mục</h3>
                <div>
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                </div>
              </div>
              {/* //Size */}
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold">Size</h3>
                <div>
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                </div>
              </div>
              {/* <!-- Color --> */}
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold">Màu sắc</h3>
                <div>
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                </div>
              </div>
              {/* <!-- Khoang gia --> */}
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold">Khoảng giá</h3>
                <div className="">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-[120px] h-[38px] py-[8px] px-[16px] border border-neutral-200 rounded-full focus:outline-none"
                      placeholder="₫ TỪ"
                    />
                    <div className="h-[1px] w-[12px] border border-neutral-200"></div>
                    <input
                      type="text"
                      className="w-[120px] h-[38px] py-[8px] px-[16px] border border-neutral-200 rounded-full focus:outline-none"
                      placeholder="₫ ĐẾN"
                    />
                  </div>

                  <button
                    className="mt-4 w-full select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    ÁP DỤNG
                  </button>
                </div>
              </div>
              {/* <!-- On sale --> */}
              <div className="relative flex flex-row justify-between py-8 space-y-4 border-b border-slate-300">
                <div>
                  <h3 className="font-semibold">On sale!</h3>
                  <span className="text-slate-900 text-sm font-normal">
                    Sản phẩm đang giảm giá
                  </span>
                </div>
                <div>
                  <label className="cursor-default flex-shrink-0 group h-5 inline-flex items-center justify-center relative w-10">
                    <input
                      type="checkbox"
                      className="peer hidden absolute border-none h-5 rounded w-10 checked:border-0 checked:bg-transparent checked:focus:bg-transparent checked:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      name="foo"
                      value="bar"
                    />
                    <span className="peer-checked:bg-green-500 absolute bg-gray-200 duration-200 ease-in-out h-4 mx-auto pointer-events-none rounded-full transition-colors w-9"></span>
                    <span className="peer-checked:translate-x-5 absolute bg-white border border-gray-200 duration-200 ease-in-out h-5 inline-block left-0 pointer-events-none ring-0 rounded-full shadow transform transition-transform translate-x-0 w-5"></span>
                  </label>
                </div>
              </div>
              {/* <!-- Sort order --> */}
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300 border-transparent">
                <h3 className="font-semibold">Sắp xếp theo</h3>
                <div>
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                  <CheckBox />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- // list --> */}
          <div className="lg:col-span-3 md:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
            {/* <!-- item --> */}
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
            <ItemProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
