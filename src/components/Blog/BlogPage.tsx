
import BlogList from './BlogList'

const BlogPage = () => {
  return (
    <div>
      {/* <Breadcrumb list={listBreadcrumb} /> */}
      <div className="xl:flex xl:justify-center lg:flex lg:justify-center">
        <BlogList />
        {/* <HotBlog/> */}
      </div>
    </div>
  )
}

export default BlogPage