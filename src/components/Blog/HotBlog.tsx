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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return (
    <div className="xl:w-4/12 lg:w-4/12 p-3">
      <h2 className="text-center p-4 pt-0 text-2xl font-semibold hover:text-[#fe385c]">
        <a href="">Tin tức nổi bật</a>
      </h2>
      {blogList.map((blog,index) => (
        <div className="flex gap-2 items-center">
          <div className="relative p-3 xl:w-3/6">
            <a href="">
              <img className="xl:w-full xl:h-32 lg:w-20 w-16 h-16 rounded" src={blog.image} alt="" />
            </a>
            <p className="absolute left-0 top-[37px] xl:top-[63px] rounded-full w-5 h-5 xl:w-6 xl:h-6 bg-[#fe385c] text-white flex justify-center items-center">
              {index+1}
            </p>
          </div>
          <div className="xl:w-3/4">
            <h3 className="text-sm font-semibold hover:text-[#fe385c]">
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
