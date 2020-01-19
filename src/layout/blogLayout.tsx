import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import { PageQuery } from "../../types/graphql-types"
import SEO from "../shared/seo"
import { loadScript } from "../util/loadScript"

const BlogLayout: React.FC<{ data: PageQuery }> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark!

  React.useEffect(() => {
    const twitterEl = document.querySelector(".twitter-tweet")
    if (twitterEl) {
      loadScript("https://platform.twitter.com/widgets.js", () => {
        window.twttr.widgets.load()
      })
    }
  }, [])

  return (
    <Layout>
      <SEO
        title={frontmatter?.title!}
        description={frontmatter?.description!}
        image={frontmatter?.image!}
        pathname={frontmatter?.path!}
      />
      <div className="blog-post-container">
        <div className="blog-post">
          <h1 className="text-5xl">{frontmatter?.title}</h1>
          <div>
            <p className="text-lg">{frontmatter?.date}</p>
            <a
              className="text-lg text-purple-800 hover:underline"
              href={frontmatter?.author_website!}
              target="_blank"
              rel="noopener noreferrer"
            >
              {frontmatter?.author}
            </a>
          </div>
          <div
            id="blog"
            className="mt-5 markdown"
            dangerouslySetInnerHTML={{ __html: html! }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default BlogLayout

export const pageQuery = graphql`
  query Page($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        author
        author_website
        description
        image
      }
    }
  }
`
