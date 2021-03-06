import React from "react"
import { useHistory } from "react-router-dom"

import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { ReactComponent as LandingImg } from "./landing-img.svg"

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "5rem",
  },
  subtitle: {
    fontSize: "1.5rem",
    padding: "1rem",
  },
  start: {
    fontSize: "2rem",
    padding: "4px 40px",
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      width: 0,
    },
  },
}))

function StartButton() {
  const classes = useStyles()
  const history = useHistory()

  function handleClick() {
    history.push("/activity")
  }

  return (
    <Button variant="contained" className={classes.start} onClick={handleClick}>
      Start
    </Button>
  )
}

export default function Landing() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div>
            <Typography variant="h1" component="h1" className={classes.title}>
              Passworks
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.subtitle}
            >
              What makes a good password? More importantly, what makes a bad
              password? In this mini-lesson, we’ll teach you about various
              aspects of password security. Are you ready?
            </Typography>
            <StartButton />
          </div>
          <LandingImg className={classes.img} height="100%" width="100%" />
        </div>
      </section>
    </Container>
  )
}
