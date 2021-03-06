import React from "react"
import { Link } from "gatsby"

export const Footer = () => {
  return (
    <footer className="mt-5 bg-purple-200">
      <div
        className="flex flex-col"
        style={{
          maxWidth: 960,
          margin: `0 auto`,
          padding: `0px 1rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h5 className="text-2xl">Others</h5>
            <Link to="/faq" className="link">
              FAQ
            </Link>
            <Link to="/blogs/introduction" className="link">
              About this site
            </Link>
            <a
              className="link"
              href="https://github.com/whatisonchain/whatisonchain/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bug report
            </a>
            <a
              className="link"
              href="https://forms.gle/3oiboPZJ7ff6R7oX6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback / Suggestion
            </a>
            <a
              className="link"
              href="https://gitcoin.co/grants/389/whatisonchain"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support us on Gitcoin
            </a>
            <a
              className="link"
              href="https://alchemy.daostack.io/dao/0x294f999356ed03347c7a23bcbcf8d33fa41dc830/proposal/0xb967781a8fbde196875d542ad223ff5b187740aac07db9212228c534256db96a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support us on Genesis Dao
            </a>
          </div>
          <div className="flex flex-col">
            <h5 className="text-2xl">Social</h5>
            <a
              className="link"
              href="https://t.me/whatisonchain"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              className="link"
              href="https://github.com/whatisonchain/whatisonchain"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="text-center text-purple-900">
          © {new Date().getFullYear()}, Built with ❤️ from WhatIsOnchain?
        </div>
      </div>
    </footer>
  )
}
