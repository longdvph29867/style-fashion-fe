import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  useEffect(() => {
    if (!queryParams.get("search")) {
      form.resetFields();
    }
  }, [location.search]);

  return (
    <Form
      form={form}
      action=""
      className={`flex-1 text-slate-900 ${className}`}
      onFinish={(value) => {
        console.log(value);
        if (value.name) {
          setSearch(value.name);
          navigate(`/products?search=${value.name}`);
        }
      }}
    >
      <div className="flex items-center pt-2">
        <Form.Item
          // label="Tên sản phẩm"
          className="flex items-center "
          name="name"
        // rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
        >
          <Input.Search
            // size="large"
            placeholder="Tìm kiếm..."
            onSearch={() => {
              form.submit(); // Kích hoạt submit form khi nhấn vào nút search
            }}
          />
        </Form.Item>
        {/* <IoSearchOutline className="text-xl text-slate-700" /> */}
        {/* <input
          placeholder="Tìm kiếm..."
          className="border-none bg-transparent outline-none w-full text-sm pl-1"
          type="search"
        /> */}
      </div>
    </Form>
  );
};

export default Search;
