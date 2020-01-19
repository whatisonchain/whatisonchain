import { Link } from "gatsby"
import React from "react"
import "./header.css"

interface HeaderProps {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = "" }) => (
  <header
    className="bg-purple-800 mb-5"
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        paddingRight: `1rem`,
        paddingLeft: `1rem`,
      }}
    >
      <Link to="/" className="text-white text-5xl">
        {siteTitle}
      </Link>

      <div className="pb-3">
        <Link className="header-link" to="/">
          Coins
        </Link>
        <Link className="header-link" to="/blogs">
          Blogs
        </Link>
      </div>
    </div>
  </header>
)

export default Header
