import { Pagination } from "antd";
// import "./paginationPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
type Porps = {
  current: number;
  total: number;
  pageSize: number;
  theme?: string;
  currentUrl: null | string;
};
const PaginationPage = ({ current, total, pageSize, theme, currentUrl }: Porps) => {
  const navigate = useNavigate();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  // const params = new URLSearchParams(url.search);
  const [currentPage, setCurrentPage] = useState(current);
  const onChange = (page: number) => {
    if (!currentUrl) {
      // console.log("currentUrl", currentUrl);
      setCurrentPage(page);
      params.set("page", page.toString());
      // console.log(location.pathname + "?" + params.toString());
      navigate(location.pathname + "?" + params.toString());
    } else {
      console.log(currentUrl, "currentUrl");
      const url = new URL(currentUrl);
      console.log(url, "url");

      // Giữ lại các tham số truy vấn cũ và cập nhật trang mới
      url.searchParams.set("page", page.toString());

      // Điều hướng đến URL mới với các tham số giữ nguyên
      navigate(`${url.pathname}?${url.searchParams.toString()}`);

      // Cập nhật tham số page
      // params.set("page", page.toString());
      // Điều hướng đến URL mới với các tham số giữ nguyên
      // navigate(`${url.pathname}?${params.toString()}`);

    }
  };
  useEffect(() => {
    setCurrentPage(current);
  }, [current]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params.get("orderStatus")]);

  return (
    <div
      className="my-4 flex justify-center"
    >
      <Pagination
        showSizeChanger={false}
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationPage;
