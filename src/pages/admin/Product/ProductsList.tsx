import { useEffect, useState } from "react";
import {
  hiddenSpinner,
  showSpinner,
} from "../../../util/util";
import { Link } from "react-router-dom";
import { Button, Image, Modal, message } from "antd";
import { https } from "../../../config/axios";
import { IProduct } from "../../../types/productType";

const ProductsList: React.FC = () => {
  const [porudctsList, setPorudctsList] = useState<IProduct[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchData = async () => {
    window.scrollTo(0, 0);
    showSpinner();
    try {
      const { data } = await https.get("/products?limit=100");
      setPorudctsList(data.results);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    showSpinner();
    try {
      const data = await https.delete(`/products/${id}`);
      if (data) {
        message.success(data.data.message);
        fetchData();
        hiddenSpinner();
      }
    } catch (error) {
      hiddenSpinner();
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const { confirm } = Modal;

  const showConfirm = (id: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
      maskClosable: true,
    });
  };

  return (
    <div className="">
      <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
        <Link
          to="/admin/products/add"
          className="text-white text-base font-semibold bg-green-500 py-2 px-2 rounded my-5 hover:bg-green-600"
        >
          <span>Thêm mới</span>
        </Link>
      </div>
      <div className="h-full mt-4 overflow-x-auto">
        <div className="w-full border-gray-200 text-slate-500">
          <div className="w-full grid lg:grid-cols-8 sm:grid-cols-5 grid-cols-2 gap-2">
            <div className="lg:block hidden text-center pr-6 pl-4 py-3 font-bold uppercase text-slate-800">
              Ảnh
            </div>
            <div className="lg:block hidden sm:col-span-2 pr-6 pl-4 py-3  text-left font-bold uppercase text-slate-800">
              Tên sản phẩm
            </div>
            <div className="lg:block hidden col-span-3 pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
              Mô tả
            </div>
            <div className="lg:block hidden pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
              Đánh giá
            </div>
            <div className="lg:block hidden pr-6 pl-2 py-3  text-left font-bold uppercase text-slate-800">
              Thao tác
            </div>
          </div>
          <div>
            {[...porudctsList].reverse().map((product, index) => {
              return (
                <div
                  key={index}
                  className="relative grid lg:grid-cols-8 sm:grid-cols-5 grid-cols-2 gap-2 border-t border-slate-100"
                >
                  <span className='absolute top-0.5 left-1 text-slate-300'>{++index}</span>
                  <div className="p-2">
                    <div className="px-2 py-1 min-w-[110px] text-center">
                      <Image
                        src={product.thumbnail}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="p-2 sm:col-span-2">
                    <div className="flex flex-col justify-center">
                      <h6 className="text-base font-normal">{product.name}</h6>
                      {/* <p className="text-sm text-slate-400">Nữ</p> */}
                    </div>
                  </div>
                  <div className="lg:block p-2 col-span-3">
                    <p className="text-sm ">
                      {product.description?.slice(0, 150)}...
                    </p>
                  </div>
                  {/* <div className="p-2">
                    <span className="text-sm font-semibold text-slate-400">
                      {formartCurrency(100000)}
                    </span>
                  </div>
                  <div className="lg:block hidden p-2">
                    <p className="text-sm ">{`categories`}</p>
                  </div> */}
                  <div className="p-2 space-x-2">
                    <Link
                      to={`/admin/reviews/${product.id}`}
                      className="text-sm font-semibold text-green-500 hover:text-green-600"
                    >
                      Xem đánh giá
                    </Link>
                  </div>
                  <div className="p-2 space-x-2">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
                    >
                      Chi tiết
                    </Link>
                    <>
                      <button
                        onClick={() => showConfirm(product.id)}
                        className="text-sm font-semibold text-red-500 hover:text-red-600"
                      >
                        Xoá
                      </button>
                    </>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
