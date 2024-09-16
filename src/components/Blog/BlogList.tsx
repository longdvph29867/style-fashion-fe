import { useEffect, useState } from "react";
import { https } from "../../config/axios";
import { hiddenSpinner, showSpinner } from "../../util/util";
import { Blog } from "../../types/blog";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
const BlogList = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;

  const fetchData = async (page = 1) => {
    try {
      showSpinner();
      const API = `/blogs?page=${page}&limit=${pageSize}&sortBy=createdAt:desc`;
      const { data } = await https.get(API);
      setBlogList(data.results);
      setTotalResults(data.totalResults);
      console.log("data", data.results);
      hiddenSpinner();
      setBlogList(data.results);
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()}`;

  return (

    <div className="max-w-7xl mx-auto xl:p-12 p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Latest News &amp; Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Card 1 */}
        {blogList.map((blog) => (
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/blog/${blog._id}`}>
              <img src={blog.image} alt="Blog Image" className="w-full h-72 rounded object-cover object-top" />
            </Link>
            <div className="absolute flex justify-center items-center top-[263px] left-6 bg-gradient-to-r h-11 w-32 from-pink-400 to-orange-400 text-white px-3 py-1 rounded text-lg font-normal">
              {formattedDate}
            </div>
            <div className="px-6 py-4 bg-[#FEEFF3]">
              <h3 className="mt-4 text-lg font-semibold my-line-1 "><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h3>
              <p className="mt-2 text-gray-600 my-line-2" dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}></p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Link
                  to={`/blog/${blog._id}`}
                  className="flex justify-start items-center text-[#fe385c] hover:text-orange-500"
                >
                  Đọc tiếp
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalResults}
          onChange={handlePageChange}
        />
      </div>
    </div>



  );
};
export default BlogList;
