import React from "react"
import PropTypes from "prop-types"

export default function Phone({ topContent, content }) {
  return (
    <div className="main-container">
      <div className="phone-bezel">
        <div className="phone-screen">
          <div className="phone-cutout" />
          {topContent ? (
            <div className="phone-content-top">{content}</div>
          ) : (
            <div className="phone-content">{content}</div>
          )}
        </div>
      </div>
    </div>
  )
}

Phone.defaultProps = {
  topContent: false,
}

Phone.propTypes = {
  topContent: PropTypes.bool,
  content: PropTypes.node.isRequired,
}
