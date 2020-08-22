/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"

import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import CommonPassword from "../CommonPassword/CommonPassword"

import commonPws from "../../constants/common.json"

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

export default function ListOfCommonPasswords() {
  const classes = useStyles()
  const [showRest, setShowRest] = useState(false)

  return (
    <Container maxWidth="lg">
      <section className="hero is-fullheight" style={{ paddingTop: 70 }}>
        <div className="hero-body">
          <div>
            <Typography variant="h1" component="h1" className={classes.title}>
              List of the 1000 Most Common Passwords
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.subtitle}
            >
              Try a password (four characters or more):
            </Typography>
            <CommonPassword />
            <br />
            <Paper variant="outlined">
              <Typography
                variant="body1"
                component="h2"
                className={classes.subtitle}
              >
                Or just take a look at the first 100!
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {commonPws.slice(0, 100).map((pw) => {
                  return (
                    <Grid item xs={3}>
                      {pw}
                    </Grid>
                  )
                })}
              </Grid>
              <br />
              <Button
                onClick={() => setShowRest(!showRest)}
                variant="contained"
              >
                See Passwords 100-1000
              </Button>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {showRest &&
                  commonPws.slice(100, 900).map((pw) => {
                    return (
                      <Grid item xs={3}>
                        {pw}
                      </Grid>
                    )
                  })}
              </Grid>
            </Paper>
          </div>
        </div>
      </section>
    </Container>
  )
}
