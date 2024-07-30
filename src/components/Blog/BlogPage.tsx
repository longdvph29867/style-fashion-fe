import React from 'react'
import BlogList from './BlogList'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import HotBlog from './HotBlog'

type Props = {}

const BlogPage = (props: Props) => {
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