import React from 'react'
import BlogList from './BlogList'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

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
        <BlogList/>
    </div>
  )
}

export default BlogPage