/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { useHistory } from "react-router-dom"

import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"

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

export default function Game() {
  const classes = useStyles()
  const history = useHistory()
  const sendTo = (location) => {
    history.push(location)
  }
  return (
    <Container maxWidth="lg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div>
            <Typography variant="h1" component="h1" className={classes.title}>
              Does Your Pass Work?
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.subtitle}
            >
              Okay, so now you're a password-creating pro.
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.subtitle}
            >
              Let's test just how much of a pro you are.
            </Typography>
            <Button variant="contained">Pick the Best Password</Button>
            <Button variant="contained" onClick={() => sendTo("/game/create")}>
              Create an Amazing Password
            </Button>
          </div>
        </div>
      </section>
    </Container>
  )
}
