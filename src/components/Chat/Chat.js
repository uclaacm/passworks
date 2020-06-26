import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Divider from "@material-ui/core/Divider"
import FadeIn from "react-fade-in"
import VisibilitySensor from "react-visibility-sensor"

import AccountCircleIcon from "@material-ui/icons/AccountCircle"

const useStyles = makeStyles({
  textMessage: {
    fontSize: ".9em",
    lineHeight: "1.2em",
  },
})

export default function Chat({ messages }) {
  const classes = useStyles()

  const chatMessages = messages.map((message) => {
    return (
      <div className={`${message.type} messages`} key={message.contents}>
        <div className={`message ${message.pos}`}>
          <Typography variant="body1" className={classes.textMessage}>
            {message.contents}
          </Typography>
        </div>
      </div>
    )
  })

  return (
    <VisibilitySensor>
      {({ isVisible }) => (
        <div className="chat-container">
          <div className="chat">
            <Box display="flex" flexDirection="column" alignItems="center">
              <AccountCircleIcon
                style={{
                  marginTop: "-10",
                  fontSize: "2.2em",
                  color: "#b3b3b3",
                }}
              />
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Hackerman
              </Typography>
            </Box>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            {isVisible ? (
              <FadeIn delay={1400} transitionDuration={1000}>
                {chatMessages}
              </FadeIn>
            ) : null}
          </div>
        </div>
      )}
    </VisibilitySensor>
  )
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      pos: PropTypes.string.isRequired,
      contents: PropTypes.node.isRequired,
    })
  ).isRequired,
}
