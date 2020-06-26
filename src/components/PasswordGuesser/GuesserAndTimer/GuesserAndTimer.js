import React from "react"
import PropTypes from "prop-types"
import { useCountUp } from "react-countup"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TimerIcon from "@material-ui/icons/Timer"

const useStyles = makeStyles({
  counter: {
    fontSize: "2em",
    fontFamily: "Monospace",
    letterSpacing: 6,
    textAlign: "center",
  },
  start: {
    height: "2em",
    fontSize: "1em",
    fontWeight: 400,
    marginTop: 10,
  },
  text: {
    textAlign: "center",
  },
  timer: {
    fontSize: "1.5em",
    fontFamily: "Monospace",
    textAlign: "center",
    paddingTop: ".25em",
  },
})

export default function GuesserAndTimer({
  genEnd,
  duration,
  genFormattingFn,
  decimals,
  timeFormattingFn,
}) {
  const classes = useStyles()

  const guesser = useCountUp({
    start: 0,
    end: genEnd,
    duration,
    useEasing: false,
    formattingFn: genFormattingFn,
    startOnMount: false,
  })

  const timer = useCountUp({
    start: 0,
    end: duration,
    duration,
    decimals,
    useEasing: false,
    formattingFn: timeFormattingFn,
    startOnMount: false,
  })

  const start = () => {
    guesser.start()
    timer.start()
  }

  return (
    <>
      <Box className={classes.counter}>{guesser.countUp}</Box>
      <Button
        disableRipple
        onClick={start}
        variant="contained"
        disableElevation
      >
        Start
      </Button>
      <Box
        className={classes.timer}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TimerIcon style={{ fontSize: "1em", marginRight: "5px" }} />
        {timer.countUp}
      </Box>
    </>
  )
}

GuesserAndTimer.propTypes = {
  genEnd: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  genFormattingFn: PropTypes.func.isRequired,
  decimals: PropTypes.number.isRequired,
  timeFormattingFn: PropTypes.func.isRequired,
}
