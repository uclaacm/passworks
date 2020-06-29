import React, { useState } from "react"
import PropTypes from "prop-types"
import MuiTypography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import makeStyles from "@material-ui/core/styles/makeStyles"
import IconButton from "@material-ui/core/IconButton"
import Box from "@material-ui/core/Box"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"

const Typography = withStyles({
  root: {
    fontSize: "1em",
    textAlign: "left",
    padding: "10px",
  },
})(MuiTypography)

const useStyles = makeStyles({
  math: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "10px 0px",
    letterSpacing: "2px",
  },
})

export default function Comparison({ type, inputLength }) {
  const classes = useStyles()
  const [count, setCount] = useState(0)

  let lessPasswords = 0
  let morePasswords = 0
  let slideItems = []

  if (type === "length") {
    lessPasswords = 10 ** 4
    morePasswords = 10 ** inputLength

    slideItems = [
      <Typography>
        What’s the relationship between password length and number of possible
        passwords?
      </Typography>,
      <Typography>
        For passwords using digits, there are 10 options for each character of
        the password. So, we can calculate the number of possible passwords as
        follows.
      </Typography>,
      <Typography>
        For a 4-digit password, there are
        <div className={classes.math}>
          10<sup>4</sup> = {lessPasswords.toLocaleString("en")}
        </div>
        possible passwords.
      </Typography>,
      <Typography>
        The longer password you submitted had {inputLength} digits, and with{" "}
        {inputLength} digits there are
        <div className={classes.math}>
          10<sup>{inputLength}</sup> = {morePasswords.toLocaleString("en")}
        </div>
        possible passwords.
      </Typography>,
      <Typography>
        Thus, increasing the password’s length by {inputLength - 4} means that
        we can create
        <div className={classes.math}>
          {morePasswords.toLocaleString("en")} -{" "}
          {lessPasswords.toLocaleString("en")} ={" "}
          {(morePasswords - lessPasswords).toLocaleString("en")}
        </div>
        more passwords.
      </Typography>,
    ]
  } else if (type === "variety") {
    lessPasswords = 6 ** 6
    morePasswords = 12 ** inputLength

    slideItems = [
      <Typography>
        What’s the relationship between password length and number of possible
        passwords?
      </Typography>,
      <>
        <Typography>
          Using only the first 6 lowercase letters, there are only 6 options for
          each character. If we add uppercase characters, there are 12 options
          for each character.
        </Typography>
        <Typography>
          So, we can calculate the number of possible passwords as follows.
        </Typography>
      </>,
      <Typography>
        With just lowercase characters, there are
        <div className={classes.math}>
          6<sup>6</sup> = {lessPasswords.toLocaleString("en")}
        </div>
        possible passwords.
      </Typography>,
      <Typography>
        With both uppercase and lowercase characters, there are
        <div className={classes.math}>
          12<sup>{inputLength}</sup> ={morePasswords.toLocaleString("en")}
        </div>
        possible passwords.
      </Typography>,
      <Typography>
        Thus, including both lowercase and uppercase characters in our password
        means we can create
        <div className={classes.math}>
          {morePasswords.toLocaleString("en")} -
          {lessPasswords.toLocaleString("en")} ={" "}
          {(morePasswords - lessPasswords).toLocaleString("en")}
        </div>
        more passwords.
      </Typography>,
    ]
  }

  const renderButtons = () => {
    const renderNext = count !== slideItems.length - 1
    const renderBack = count !== 0

    const nextButton = (
      <IconButton
        aria-label="next"
        disableRipple
        variant="outlined"
        onClick={() => setCount(count + 1)}
      >
        <NavigateNextIcon />
      </IconButton>
    )
    const backButton = (
      <IconButton
        aria-label="back"
        disableRipple
        variant="outlined"
        onClick={() => setCount(count - 1)}
      >
        <NavigateBeforeIcon />
      </IconButton>
    )

    return (
      <>
        {renderBack && backButton}
        {renderNext && nextButton}
      </>
    )
  }

  return (
    <Box display="flex" flexDirection="column">
      <div style={{ position: "absolute", bottom: "250px" }}>
        {slideItems[count]}
      </div>
      <div
        style={{ position: "absolute", right: "0", left: "0", bottom: "210px" }}
      >
        {renderButtons()}
      </div>
    </Box>
  )
}

Comparison.propTypes = {
  type: PropTypes.string.isRequired,
  inputLength: PropTypes.number.isRequired,
}
