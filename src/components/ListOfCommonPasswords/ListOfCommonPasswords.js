/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"

import makeStyles from "@material-ui/core/styles/makeStyles"
import {
  Button,
  Container,
  Grid,
  Link,
  Typography,
  Paper,
} from "@material-ui/core"

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
  textCenter: {
    textAlign: "center",
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
              List of the 1000 Most Common Passwords*
            </Typography>
            <Typography variant="body1" component="h2">
              *this list is curated from{" "}
              <Link
                color="secondary"
                href="https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-100000.txt"
                target="_blank"
                rel="noopener noreferrer"
              >
                this list of password breaches
              </Link>
            </Typography>
            <Typography variant="body1" component="h2">
              There are lots of other common password lists too! One really
              popular one is{" "}
              <Link
                color="secondary"
                href="https://haveibeenpwned.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                haveibeenpwned
              </Link>
              , which lets you search by your email (and tells you if your email
              and password have been posted online)!
            </Typography>
            <hr />
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
                {commonPws.slice(0, 100).map((pw) => (
                  <Grid item xs={3}>
                    <Typography className={classes.textCenter}>{pw}</Typography>
                  </Grid>
                ))}
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
                  commonPws.slice(100, 1000).map((pw) => (
                    <Grid item xs={3}>
                      <Typography className={classes.textCenter}>
                        {pw}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          </div>
        </div>
      </section>
    </Container>
  )
}
