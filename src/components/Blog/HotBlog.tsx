import { useEffect, useState } from "react";
import { Blog } from "../../types/blog";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { https } from "../../config/axios";




const HotBlog = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const fetchData = async () => {
    try {
      showSpinner();
      const API = `/blogs`;
      const { data } = await https.get(API);
      console.log(data.results);
      hiddenSpinner();
      setBlogList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return (
    <div className="xl:w-4/12 lg:w-4/12 p-3">
      <h2 className="text-center p-4 pt-0 text-2xl font-semibold hover:text-[#fe385c]">
        <a href="">Tin tức nổi bật</a>
      </h2>
      {blogList.map((blog, index) => (
        <div className="flex items-center">
          <div className="relative p-2 xl:w-1/3 lg:w-2/5 md:w-1/6 w-1/3 2xl:w-1/6">
            <a href="">
              <img className="xl:h-24 xl:w-24 md:w-24 md:h-24 lg:w-20 lg:h-20 w-full h-24 rounded" src={blog.image} alt="" />
            </a>
            <p className="absolute left-1 top-[4px] xl:top-[5px] md:top-[5px] rounded-full w-5 h-5 lg:w-5 lg:h-5 md:w-5 md:h-5  text-xs xl:w-6 xl:h-6 bg-[#fe385c] text-white flex justify-center items-center">
              {index + 1}
            </p>
          </div>
          <div className="xl:w-3/4 w-3/5">
            <h3 className="text-sm font-semibold hover:text-[#fe385c] my-line-2">
              <a href="">{blog.title}</a>
            </h3>
            <p className="text-sm text-[#fe385c]">{formattedDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotBlog;
