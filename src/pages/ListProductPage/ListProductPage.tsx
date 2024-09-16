import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../types/products";
import { Checkbox, CheckboxProps, Form, Input, Radio, Select } from "antd";
import { GoDash } from "react-icons/go";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productService";
import PaginationPage from "../../components/PaginationPage/PaginationPage";
import categoryService from "../../services/categoryService";
import "./listProduct.css";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { FilterOutlined } from "@ant-design/icons";


const buttonSort = [
  { label: "Mới nhất", value: "newest" },
];

const ListProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [valueRadio, setValueRadio] = useState(null);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openFilter, setOpenFilter] = useState(false);

  const slugCategory = queryParams.get("categories")
    ? queryParams.get("categories")?.split(",")
    : [];

  const limit = 12;
  const currentPage = queryParams.get("page")
    ? Number(queryParams.get("page"))
    : 1;
  queryParams.set("limit", limit.toString());
  queryParams.set("page", currentPage.toString());

  // const { data } = useQuery({
  //   queryKey: ["products", location.search],
  //   queryFn: () =>
  //     productService
  //       .getFilterProducts(limit, currentPage, queryParams.get("categories"))
  //       .then((res) => res.data),
  // });

  // const { data: categoriesData } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: () =>
  //     categoryService.getAllCategories().then((res) => res.data.results),
  //   refetchInterval: 3 * 60 * 1000,
  // });

  const fetchData = async () => {
    // console.log('location.search', location.search);
    // console.log('queryParams', queryParams.toString());
    // return
    showSpinner();
    try {
      const { data } = await productService.getFilterProducts(queryParams.toString());
      setProducts(data.results);
      setTotalProducts(data.totalResults);
      window.scrollTo(0, 0);
      hiddenSpinner();
    } catch (error) {
      console.log(error);
      hiddenSpinner();
    }
  }

  const fetchCategories = async () => {
    const { data } = await categoryService.getAllCategories();
    setCategoriesList(data.results.map((category: any) => ({
      label: category.name,
      value: category.id,
    })));
  };

  useEffect(() => {
    fetchData();
    if (!queryParams.get("categories")) {
      setSelectedCategory(null);
    }
    if (!queryParams.get("fromPrice")) {
      form.resetFields();
    }
    if (!queryParams.get("toPrice")) {
      form.resetFields();
    }
    // console.log(location.search, 'location.search');
  }, [location.search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // const onChange: CheckboxProps["onChange"] = (e) => {
  //   const newCategory = e.target.value;
  //   let updatedCategories = slugCategory ? [...slugCategory] : [];
  //   if (updatedCategories.includes(newCategory)) {
  //     updatedCategories = updatedCategories.filter((c) => c !== newCategory);
  //   } else {
  //     updatedCategories.push(newCategory);
  //   }
  //   if (updatedCategories.length === 0) {
  //     queryParams.delete("categories");
  //   } else {
  //     queryParams.set("categories", updatedCategories.join(","));
  //   }
  //   navigate(location.pathname + "?" + queryParams.toString());
  // };

  const onSubmitPriceRangeFilter = (values: any) => {
    // console.log(values, 'values');
    queryParams.set("fromPrice", values.fromPrice);
    queryParams.set("toPrice", values.toPrice);
    navigate(location.pathname + "?" + queryParams.toString());
  };

  const listBreadcrumb = [
    {
      label: "Danh sách sản phẩm",
    },
  ];


  return (
    <div className="py-20">
      <Breadcrumb list={listBreadcrumb} />
      <div className="container mx-auto mt-10">
        <div
          className="flex lg:hidden mb-5 justify-end">
          <button
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
            className="flex gap-1 items-center px-4 py-2 text-sm font-medium rounded-md border bg-orange-400 hover:bg-orange-500 text-white">
            <FilterOutlined />
            Bộ lọc
          </button>
        </div>
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3 relative">
          {/*  */}

          <div className={`col-span-1 pr-4 ${openFilter ? 'block absolute right-0 top-[-20px] w-[300px] z-50 bg-[#FAFAFA] p-10 rounded-md' : 'hidden'} lg:block`}>

            <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
              <h3 className="font-semibold ">Danh mục</h3>
              <div className="grid grid-flow-row gap-1 filter-product">
                <Select
                  // mode="multiple"
                  style={{ height: '36px' }}
                  placeholder="Chọn danh mục"
                  options={categoriesList}
                  loading={!categoriesList.length}
                  value={selectedCategory}
                  onChange={(value: any) => {
                    console.log(value, 'value');
                    setSelectedCategory(value);
                    queryParams.set("categories", value);
                    navigate(location.pathname + "?" + queryParams.toString());
                  }}
                />
              </div>
            </div>
            <div className="border-b border-slate-300 py-8">
              <h3 className="font-semibold mb-4">Khoảng Giá</h3>
              <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onSubmitPriceRangeFilter}
                autoComplete="off"
                requiredMark={false}
              >
                <div className="flex gap-2">
                  <Form.Item
                    label=""
                    name="fromPrice"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này!",
                      },
                    ]}
                  >
                    <Input placeholder="₫ Từ" />
                  </Form.Item>
                  <GoDash className="text-3xl text-slate-500 col-span-1" />
                  <Form.Item
                    label=""
                    name="toPrice"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này!",
                      },
                    ]}
                  >
                    <Input placeholder="₫ Đến" />
                  </Form.Item>
                </div>
                <button className="relative inline-flex items-center justify-center h-auto w-full px-6 py-3 mt-2 text-sm font-medium transition-colors rounded-full shadow-xl bg-primary hover:bg-[#dc2c4c] text-white">
                  Áp dụng
                </button>
              </Form>
            </div>
            <div className="mb-5 h-[62px] w-full gap-4 mt-4 ">
              <h3 className="font-semibold ">Sắp xếp theo</h3>
              <div className="flex gap-2 mt-2 justify-between">
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md border border-primary hover:bg-primary hover:text-white text-primary"
                  onClick={() => {
                    queryParams.set("sortBy", "defaultPrice:asc");
                    navigate(location.pathname + "?" + queryParams.toString());
                  }}
                >
                  Giá tăng dần
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md border border-primary hover:bg-primary hover:text-white text-primary"
                  onClick={() => {
                    queryParams.set("sortBy", "defaultPrice:desc");
                    navigate(location.pathname + "?" + queryParams.toString());
                  }}
                >
                  Giá giảm dần
                </button>

              </div>
            </div>
            <div className="mb-5 h-[62px] w-full flex items-center gap-4 mt-4">
              <button
                className="px-6 py-2 text-sm font-medium rounded-md border bg-orange-400 hover:bg-orange-500 text-white"
                onClick={() => {
                  // Reset Select
                  setSelectedCategory(null);

                  // Reset Form fields
                  form.resetFields();

                  queryParams.delete("categories");
                  queryParams.delete("fromPrice");
                  queryParams.delete("toPrice");
                  queryParams.delete("sortBy");
                  navigate(location.pathname + "?" + queryParams.toString());
                }}
              >
                Đặt lại
              </button>
            </div>
          </div>
          <div className="col-span-3">
            {/* list */}
            <div className="lg:col-span-3 md:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
              {/* item */}
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10">
              <PaginationPage
                current={currentPage}
                total={totalProducts}
                pageSize={limit}
                theme="dark"
                currentUrl={window.location.href} // Truyền URL hiện tại vào

              // currentUrl={null} // Page không có filter, sort nên truyền nullx
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;
