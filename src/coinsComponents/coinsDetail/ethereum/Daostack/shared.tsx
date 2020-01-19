import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const SharedDao: React.FC<{
  reputationHoldersCount: string
  numberOfExpiredInQueueProposals: string
  id: string
}> = props => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <span>Reputation Holders</span>
        <span>{props.reputationHoldersCount}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span>Open Proposals</span>
        <span>{props.numberOfExpiredInQueueProposals}</span>
      </div>
      <div className="my-2">
        <a
          href={`https://alchemy.daostack.io/dao/${props.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-blue flex flex-row justify-center"
          title="Link to daostack"
        >
          <DaostackLogo />
          <span className="ml-2">Open in Daostack</span>
        </a>
      </div>
    </div>
  )
}

export const DaostackLogo: React.FC<{
  style?: React.HTMLAttributes<HTMLImageElement>["style"]
}> = ({ style }) => {
  const imageData = useStaticQuery(graphql`
    {
      placeholderImage: file(relativePath: { eq: "alchemy-logo-white.svg" }) {
        publicURL
      }
    }
  `)
  return <img style={style} src={imageData.placeholderImage.publicURL} />
}
