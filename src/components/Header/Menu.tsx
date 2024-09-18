import { Link } from "react-router-dom";
import categoryService from "../../services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { CategoryTpype } from "../../types/categoryType";

const Menu = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      categoryService.getAllCategories().then((res) => res.data.results),
    refetchInterval: 3 * 60 * 1000,
  });

  return (
    <ul className="flex items-center lg:justify-start justify-center lg:flex-nowrap flex-wrap">
      <li>
        <Link
          className="py-2.5 px-5 font-medium rounded-full duration-300 text-content hover:text-title hover:bg-[#ebebeb]"
          to="/"
        >
          Trang chủ
        </Link>
      </li>
      <li className="relative group">
        <a
          href="#"
          className="flex items-center py-2.5 px-5 font-medium rounded-full duration-300 text-content hover:text-title hover:bg-[#ebebeb]"
        >
          Danh mục
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="ml-1 mt-1 h-4 w-4 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <div className="group-hover:visible group-hover:opacity-100 invisible duration-300 absolute transform z-10 w-56 top-full left-0 opacity-0 translate-y-0">
          <ul className="rounded-lg shadow-lg border border-neutral-100 text-sm relative bg-white py-4 grid gap-1">
            {data?.map((category: CategoryTpype) => {
              return (
                <li key={category.id} className="px-2">
                  <Link
                    className="flex items-center font-normal text-neutral-600 py-2 px-4 rounded-md hover:bg-neutral-100"
                    to={`/products?categories=${category.id}`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
      <li>
        <Link
          className="py-2.5 px-5 font-medium rounded-full duration-300 text-content hover:text-title hover:bg-[#ebebeb]"
          to="/products"
        >
          Sản phẩm
        </Link>
      </li>
      {/* <li>
        <a
          className="py-2.5 px-5 font-medium rounded-full duration-300 text-content hover:text-title hover:bg-[#ebebeb]"
          href="#"
        >
          Khuyến mại
        </a>
      </li> */}
      <li>
        <a
          className="py-2.5 px-5 font-medium rounded-full duration-300 text-[#6a6a6a] hover:text-[#222] hover:bg-[#ebebeb]"
          href="/blog"
        >
          Tin Tức
        </a>
      </li>
    </ul>
  );
};

export default Menu;
