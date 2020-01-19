import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { BlogQuery } from "../../types/graphql-types"
import Layout from "../layout/layout"

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
            date(fromNow: true)
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
            <p className="text-lg">{md.node.frontmatter?.author}</p>
            <p>{md.node.frontmatter?.date}</p>
          </div>
          <div>
            <p>{md.node.frontmatter?.description}</p>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default BlogPage
