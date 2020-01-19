/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  // blog
  const blogPostTemplate = path.resolve(`src/layout/blogLayout.tsx`)
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  // All Coins
  const { data } = await graphql(
    `
      query CoinTitle {
        allCoinsJson {
          edges {
            node {
              name
              symbol
              coin_id
              image
              tabs {
                route
                name
                description
              }
            }
          }
        }
      }
    `
  )
  data.allCoinsJson.edges.forEach(edge => {
    const slug = edge.node.coin_id
    actions.createPage({
      path: `coins/${slug}`,
      component: require.resolve(`./src/coinsComponents/CoinDetails.tsx`),
      context: { slug: slug, data: edge.node },
    })
    edge.node.tabs.forEach(tab => {
      const subRoute = tab.route
      actions.createPage({
        path: `coins/${slug}/${subRoute}`,
        component: require.resolve(`./src/coinsComponents/CoinDetails.tsx`),
        context: { slug: slug, data: edge.node, subRoute },
      })
    })
  })
}
