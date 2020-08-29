import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles({
  root: {
    padding: "10px 0px",
  },
  profileImg: {
    width: "40px",
    height: "40px",
    float: "left",
    padding: 5,
  },
  headerName: {
    fontWeight: 600,
    fontSize: "1.1em",
    lineHeight: "1em",
  },
  smallerText: {
    fontSize: "0.9em",
  },
  capName: {
    fontWeight: 600,
    fontSize: "1em",
    lineHeight: "1em",
  },
  caption: {
    fontweight: 400,
    fontSize: "1em",
  },
  timestamp: {
    fontSize: ".8em",
    color: "#eeeeeee",
  },
})

export default function Post({
  profileImg,
  location,
  postImg,
  likes,
  poster,
  caption,
  date,
}) {
  const classes = useStyles()

  return (
    <li className={classes.root}>
      <Box
        display="flex"
        direction="row"
        alignItems="center"
        className={classes.header}
      >
        <img
          src={profileImg}
          alt="profile pic"
          className={classes.profileImg}
        />
        <div>
          <Typography
            variant="body1"
            className={`${classes.headerName} text-non-selectable`}
          >
            {poster}
          </Typography>
          <Typography variant="body1" className={classes.smallerText}>
            {location}
          </Typography>
        </div>
      </Box>
      <img src={postImg} alt="instagram post" width="100%" />
      <Typography variant="body1" className={classes.smallerText}>
        {`${likes} likes`}
      </Typography>
      <Typography variant="body1" className={classes.caption}>
        <Box className={classes.capName} component="span">
          {poster}
        </Box>
        {` ${caption}`}
      </Typography>
      <Typography className={classes.timestamp}>{date}</Typography>
    </li>
  )
}

Post.propTypes = {
  profileImg: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  postImg: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}
