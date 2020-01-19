/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SeoQuery } from "../../types/graphql-types"

interface SEOProps {
  description?: string
  lang?: string
  meta?: { name: string; content: string }[]
  title?: string
  image?: string
}

const seoQuery = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        author
        image
      }
    }
  }
`

const SEO: React.FC<SEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  image = "",
  title = "",
}) => {
  const { site } = useStaticQuery<SeoQuery>(seoQuery)

  const metaDescription =
    description || (site!.siteMetadata!.description as string)

  const metaImage = image || "https://whatisonchain.com/logo.png"

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site!.siteMetadata!.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // Open Graph
        {
          property: `og:site_name`,
          content: `${site!.siteMetadata!.title}`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: metaImage,
        },
        // Twitter
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site!.siteMetadata!.author as string,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
