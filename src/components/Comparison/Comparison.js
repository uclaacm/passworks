import React, { useState } from "react"
import PropTypes from "prop-types"
import { useCountUp } from "react-countup"
import MuiTypography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import makeStyles from "@material-ui/core/styles/makeStyles"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"

import {
  toLetters,
  fromLetters,
  alphaLower,
  alphaMixed,
} from "../../util/password"

const Typography = withStyles({
  root: {
    fontSize: "1em",
    textAlign: "left",
    padding: "4px",
  },
})(MuiTypography)

const useStyles = makeStyles({
  math: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "5px 0px",
    letterSpacing: "2px",
  },
  counter: {
    fontSize: "1.5rem",
    fontFamily: "Monospace",
    letterSpacing: 6,
    textAlign: "center",
    paddingLeft: "10px",
  },
  start: {
    height: "1rem",
    fontSize: "1em",
    fontWeight: 400,
    marginTop: 10,
  },
  subtitle: {
    fontSize: ".8em",
    color: "#555555",
  },
})

export default function Comparison({ type, inputLength }) {
  const classes = useStyles()
  const [count, setCount] = useState(0)

  const counter = (end, duration, formattingFn) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const password = useCountUp({
      start: 0,
      end,
      duration,
      useEasing: false,
      formattingFn,
      startOnMount: false,
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const countup = useCountUp({
      start: 1,
      end: end + 1,
      duration,
      useEasing: false,
      startOnMount: false,
      separator: ",",
    })

    const start = () => {
      password.start()
      countup.start()
    }

    return (
      <>
        <Box display="flex" alignItems="center">
          <Typography>password: </Typography>
          <Box className={classes.counter}>{password.countUp}</Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>count: </Typography>
          <Box className={classes.counter}>{countup.countUp}</Box>
        </Box>
        <Button
          disableRipple
          onClick={start}
          variant="contained"
          disableElevation
        >
          Start
        </Button>
      </>
    )
  }

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
        the password.
      </Typography>,
      <>
        <Typography>
          Let’s count how many ways there are to make a one digit password.
        </Typography>
        {counter(9, 5, (num) => String(num))}
      </>,
      <>
        <Typography>
          Now let’s count how many ways there are to make a two digit password.
        </Typography>
        {counter(99, 5, (num) => String(num).padStart(2, "0"))}
      </>,
      <>
        <Typography>
          With one digit, there are 10 possible passwords. With two digits,
          there are 100 possible passwords!
        </Typography>
        <Typography>
          Notice that when we add a digit, we multiply the number of possible
          passwords by a factor of 10!
        </Typography>
      </>,
      <>
        <Typography>
          So, for a 4-digit password, there are
          <div className={classes.math}>
            10<sup>4</sup> = {lessPasswords.toLocaleString("en")}
          </div>
          possible passwords.
        </Typography>
        <Typography className={classes.subtitle}>
          Note: 10<sup>4</sup> just means that we take the number 10 and
          multiply it 4 times, so we get 10×10×10×10 = 10,000
        </Typography>
      </>,
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
        What’s the relationship between password character variety and number of
        possible passwords?
      </Typography>,
      <>
        <Typography>
          Let’s count the number of 6-letter passwords possible with just these
          lowercase characters: a, b, c, d, e, and f.
        </Typography>
        {counter(fromLetters("ffffff", alphaLower), 10, (num) =>
          toLetters(num, alphaLower).padStart(6, alphaLower[0])
        )}
      </>,
      <>
        <Typography>
          Now let’s count the number of 6-letter passwords possible when we
          include both uppercase and lowercase characters.
        </Typography>
        {counter(fromLetters("FFFFFF", alphaMixed), 15, (num) =>
          toLetters(num, alphaMixed).padStart(6, alphaMixed[0])
        )}
      </>,
      <>
        <Typography>Where do these values come from?</Typography>
        <Typography>
          With lowercase letters, we have 6 possibilites for each character, and
          our password’s length is 6.
          <div className={classes.math}>
            6<sup>6</sup> = {lessPasswords.toLocaleString("en")}
          </div>
        </Typography>
        <Typography>
          With uppercase and lowercase letters, we have 12 possibilites for each
          character, and our password’s length is still 6.
          <div className={classes.math}>
            12<sup>6</sup> = {morePasswords.toLocaleString("en")}
          </div>
        </Typography>
      </>,
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
      <div style={{ position: "absolute", bottom: "240px" }}>
        {slideItems[count]}
      </div>
      <div
        style={{ position: "absolute", right: "0", left: "0", bottom: "190px" }}
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
