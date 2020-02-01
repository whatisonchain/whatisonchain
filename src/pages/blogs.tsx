import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { BlogQuery } from "../../types/graphql-types"
import Layout from "../layout/layout"
import SEO from "../shared/seo"

const blogQuery = graphql`
  query Blog {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { hide_on_blogs: { eq: false } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            author
            date
            description
          }
        }
      }
    }
  }
`

const BlogPage = () => {
  const { allMarkdownRemark } = useStaticQuery<BlogQuery>(blogQuery)
  const allMd = allMarkdownRemark.edges
  return (
    <Layout>
      <SEO
        title="WhatIsOnchain? Blog"
        description="Official blog from WhatIsOnchain?"
        pathname="/blogs"
      />
      <div className="pb-4">
        <h1 className="text-5xl">Blogs</h1>
        <h3 className="text-xl">Official blog from WhatIsOnchain?</h3>
      </div>
      {allMd.map((md, key) => (
        <div key={key} className="p-2 box my-2">
          <Link
            className="text-2xl bold text-purple-800 hover:underline"
            key={key}
            to={md.node.frontmatter?.path!}
          >
            {md.node.frontmatter?.title}
          </Link>
          <div>
            <p className="text-xl font-bold">{md.node.frontmatter?.author}</p>
            <p>{md.node.frontmatter?.date}</p>
          </div>
          <div className="mt-2">
            <p>{md.node.frontmatter?.description}</p>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default BlogPage
