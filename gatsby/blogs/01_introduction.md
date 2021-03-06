---
path: "/blogs/introduction"
date: "2020-01-17"
title: "Introduction to WhatIsOnchain?"
author: "Johnson Lai (superoo7.eth)"
author_website: "https://twitter.com/jlwhoo7"
description: "Introduction post to WhatIsOnchain? It covers what's the purpose, background, features and technical of this site."
image: "https://whatisonchain.com/blogs/01_introduction_background.jpg"
hide_on_blogs: false
---

![](/blogs/01_introduction_background.jpg)

<br />

Have you ever curious what is happening on a certain cryptocurrency project but don't have time to checkout the project? Worry or not, use [WhatIsOnchain?](https://whatisonchain.com)!

# Introduction

In short, WhatIsOnchain? allows you to access to your favorite cryptocurrency project and checkout the data on top of the blockchain. This project is open source on [github](https://github.com/whatisonchain/whatisonchain).

I also realize that a few projects that are using web3, required user to use web3 provider (Metamask, Trustwallet etc) in order to use the site, so this site also allows user to directly get the data from blockchain without setting up anything with web3.

# Background

I had previously work on an [NFT Wallet](https://nft-manager.netlify.com/) project and [Steem Wallet](https://swallet.netlify.com/). I realize that with power of modern day front end development, I can build a full fletch front end website directly interacting with blockchain node, which is also known as onchain data. So, this project was created from hobby, but also a way for me to experiment onchain data and make it into use for others.

In addition to that, I also got a few feature requested on one of the discord bot that I maintained called [statbot](https://github.com/superoo7/statbot2). Therefore I wanted to create a website for users that are not familiar with technical to be able to interact with the blockchain directly.

I also believe with the power of open source, more developers that are interested into trying front end interface to build with blockchain can contribute to this project.

# Features

WhatIsOnchain? is carefully engineered to create a "light client" on your web browser, it's a for you to directly deal with blockchain at ease and peace.

Here are a few already available feature

## Calculator

Currency conversion was one of the most requested feature on the discord bot that I maintained, therefore I added this utillity into it for the ease of users to directly convert their favorite cryptocurrency.

## Ethereum

### Daostack

<div align="center">

![daostack](/blogs/01_daostack.png)
[Daostack page](/coins/ethereum/daostack)

</div>

Daostack is a dao framework that build on top of ethereum. I wanted to build an alternate view from alchemy.daostack.io. Currently support view of all the daos in daostack, view of each dao proposal's history.

## Steem

### Delegation

<div align="center">

![Steem Delegation](/blogs/01_steem_delegation.png)
[Steem Delegation page](/coins/steem/delegation)

</div>

In Steem blockchain, one of the top asked question between the community is "how do I delegate", so I implemented this feature for users that are interested to delegate their Steem Power to others.

### Steem Proposals

<div align="center">

![Steem Proposals](/blogs/01_steem_proposals.png)
[Steem Proposals page](/coins/steem/proposals)

</div>

Similar to DAO Stack, on Steem blockchain, there's also a DAO ecosystem called Steem Proposals, by calling onchain data, this site can show latest DAO's proposal on Steem.

# Future plans

## DeFi

Decentralized Finance (DeFi) allows a lot of interesting and innovative project to build on top of decentralized network. I plan to pull some onchain data for currency such as dai (https://daistats.com/), sEth, wEth and etc.

## NFT

Might be interesting to port over some feature from [NFT Wallet](https://nft-manager.netlify.com/) into this site.

## More DAO!

I've implemented DAO from Steem and Daostack, I hope that I can also port in more and more dao from different blockchain project over onto this site.

## User preference

By saving user data their local web storage, we can allow user to control their data and allow them to export to another phone using QR or text.

Data to stored are details like user preference, preferred currency, language and etc

In a way, this make user easier to interact with the site.

# Contact

## Telegram

Join our [telegram group](https://t.me/whatisonchain) (search whatisonchain)

## Bug report

You can report bugs at [github issues](https://github.com/whatisonchain/whatisonchain/issues).

## Feedback and Suggestion

I've created a [feedback form](https://forms.gle/3oiboPZJ7ff6R7oX6) for feedback and suggestions.

# Technical

This project is open source on [github](https://github.com/whatisonchain/whatisonchain), using a technology called [JAM stack](https://jamstack.org/), and for certain API that required API keys, we are using Firebase cloud functions (e.g. API call to etherscan).

Here's are a few library that we are using:

- Graphql (powered by [thegraph.com](https://thegraph.com))
- Gatsby.js
- React
- Typescript
- Tailwindcss
- Web3

## a bit about JAM Stack

There are a few advantage for using JAM stack

- Better performance

By using JAM Stack, it prerender the html header and description, which helps in SEO. The site renders also faster since it's just files (static files only).

- Higher Security

Since cryptocurrency users cares about privacy and security, by using JAM stack, there is no back end server involved, all the site is just files, you can even clone the project and runs on your computer!

- Easier to contribute

In addition to that, we use git to hold accountability, by using git history and commits, anyone and any cryptocurrency projects in the world can contribute to this project!

- Workflow

Since everything is on git, CI and CD can be inplace for deployment!
