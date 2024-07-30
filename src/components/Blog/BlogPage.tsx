
import BlogList from './BlogList'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import HotBlog from './HotBlog'



const BlogPage = () => {
    const listBreadcrumb = [
        {
          label: "Tin Tức",
        },
      ];
  return (
    <div>
        <Breadcrumb list={listBreadcrumb} />
        <div className="xl:flex xl:justify-center lg:flex lg:justify-center">
        <BlogList/>
        <HotBlog/>
        </div>
    </div>
  )
}

export default BlogPage