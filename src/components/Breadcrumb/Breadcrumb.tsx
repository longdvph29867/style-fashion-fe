import { Link } from "react-router-dom";
import bgImage from "../../assets/img/banner/breadcrumb-banner.png";

type Props = {
  list: { label: string; link?: string }[];
};

const Breadcrumb = ({ list }: Props) => {
  return (
    <div
      className={`flex items-center justify-center
    bg-cover
    border-t-2
    border-gray-300
    `}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="text-center py-10">
        <h2 className="pb-5 text-4xl">Cửa hàng</h2>
        <Link to="/">Trang chủ</Link>
        {list.map((item, index) => (
          <Link key={index} to={item.link ? item.link : ""} className="ml-1">
            / {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
