import { useEffect, useState } from "react";
import { https } from "../../config/axios";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { Blog } from "../../types/blog";
import DOMPurify from 'dompurify';
import { Link } from "react-router-dom";
const BlogList = () => {

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
    <div className="p-5 xl:w-3/4 lg:w-3/4 md:h-2/4">
        {/* <h1 className="text-2xl font-bold text-center">Tin Tức</h1> */}
        <div className="list-blog grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2">
            {blogList.map((blog)=>(
            <div className="">
                <div className="relative overflow-hidden rounded-md">
                    <Link to={`/blog/${blog.id}`} className="text-center">
                    <img className=" xl:hover:scale-110 transform transition-all duration-200 ease-linear w-full xl:h-72 h-96" src={blog.image} alt="" />
                    </Link>
                    <div className="absolute left-2 top-2 border w-28 h-7 bg-[#fe385c] flex justify-center items-center text-white font-medium rounded xl:w-20 xl:text-sm">{formattedDate}</div>
                </div>
                <div className="post-new p-1">
                    <h3 className="my-line-1 p-1 font-semibold text-xl hover:text-[#fe385c] xl:text-base"><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h3>
                    <div className="my-line-2 text-lg font-thin sm:text-base">
                     <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}></p>
                    </div>
                    <Link to={`/blog/${blog.id}`} className="flex justify-start items-center text-[#fe385c] hover:text-orange-500">Đọc tiếp
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"></path>
			<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"></path>
			</svg>
            </Link>
                </div>
            </div>
            ))}
           
            </div>
        </div>
  )
}
export default BlogList