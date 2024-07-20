import React, { useEffect, useState } from "react";
import { https } from "../../services/config";
import { useLocation, useNavigate } from "react-router-dom";
// import ItemProduct from "../../components/ItemProduct";
import { hiddenSpinner, showSpinner } from "../../util/util";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../types/products";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Divider,
  Form,
  Input,
  Select,
} from "antd";
import { GoDash } from "react-icons/go";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const ListProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slugCategory = queryParams.get("category");

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<any>([]);

  const fetchData = async () => {
    showSpinner();
    try {
      // const API = slugCategory
      //   ? `/products?category=${slugCategory}`
      //   : "/products";
      const { data } = await https.get("/products");
      console.log(data);
      setProductsList(data.results);
      hiddenSpinner();
    } catch (error) {
      console.log(error);
      hiddenSpinner();
    }
  };

  const fetchCategories = async () => {
    showSpinner();
    try {
      const { data } = await https.get("/categories");
      setCategoriesList(data.results);
      hiddenSpinner();
    } catch (error) {
      console.log(error);
      hiddenSpinner();
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const callFilterApi = async () => {
    const paramCategory = queryParams.get("categories");
    let newUrl = `/products?sortBy=createdAt:asc&limit=18&page=1`;
    if (paramCategory) {
      newUrl += `&categories=${paramCategory}`;
    }
    return https.get(newUrl);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.value} ${e.target.checked}`);
    if (e.target.checked) {
      setFilteredCategory([...filteredCategory, e.target.value]);
    } else {
      setFilteredCategory(
        filteredCategory.filter((slug: string) => slug !== e.target.value)
      );
    }
  };

  const onFilter = async () => {
    showSpinner();
    try {
      if (filteredCategory.length !== 0) {
        queryParams.set("categories", filteredCategory.join(","));
      }
      navigate(location.pathname + "?" + queryParams.toString());
      // const { data } = await https.get(`/products?categories=${filteredCategory.join(',')}`);
      const { data } = await callFilterApi();
      setProductsList(data.results);
      hiddenSpinner();
    } catch (error) {
      console.log(error);
      hiddenSpinner();
    }
  };

  useEffect(() => {
    console.log(filteredCategory, "filteredCategory");
    if (filteredCategory.length === 0) {
      queryParams.delete("categories");
      onFilter();
    } else {
      onFilter();
    }
  }, [filteredCategory]);

  const onSubmitPriceRangeFilter = (values: any) => {};
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
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
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3">
          {/*  */}

          <div className="col-span-1 pr-4">
            <div>
              <div className="relative flex flex-col py-8 space-y-4 border-b border-slate-300">
                <h3 className="font-semibold ">Danh mục</h3>
                <div className="grid grid-flow-row gap-1">
                  {categoriesList.map((category: Category, index) => (
                    <Checkbox value={category.slug} onChange={onChange}>
                      {category.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold my-4">Khoảng Giá</h3>
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 24 }}
                  style={{}}
                  initialValues={{ remember: true }}
                  onFinish={onSubmitPriceRangeFilter}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  requiredMark={false}
                >
                  <div className="flex gap-2">
                    <Form.Item
                      label=""
                      name="minPrice"
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
                      name="maxPrice"
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
                </Form>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="mb-2 h-[62px] w-full bg-slate-50 flex items-center gap-4 pl-10">
              <span className="font-normal">Sắp xếp theo</span>
              <Button className="w-[90px] h-[34px]" type="primary" danger>
                Phổ biến
              </Button>
              <Button className="bg-white w-[90px] h-[34px]">Mới nhất</Button>
              <Button className="bg-white w-[90px] h-[34px]">Bán chạy</Button>
            </div>
            {/* list */}
            <div className="lg:col-span-3 md:col-span-2 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
              {/* item */}
              {productsList.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;
