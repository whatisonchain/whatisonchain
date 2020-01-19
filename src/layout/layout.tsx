/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import "./markdown.css"
import { LayoutQuery } from "../../types/graphql-types"
import { Footer } from "./footer"

const layoutQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery<LayoutQuery>(layoutQuery)

  return (
    <>
      <Header siteTitle={site!.siteMetadata!.title!} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
