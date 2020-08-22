/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"

import makeStyles from "@material-ui/core/styles/makeStyles"
import {
  Card,
  CardContent,
  Chip,
  Container,
  Link,
  TextField,
  Typography,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

const zxcvbn = require("zxcvbn")

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
}))

function getTextScore(score) {
  switch (score) {
    case 0:
      return "too guessable"
    case 1:
      return "very guessable"
    case 2:
      return "somewhat guessable"
    case 3:
      return "safely unguessable"
    default:
      return "very unguessable!"
  }
}

function ZxcvbnResult(props) {
  // eslint-disable-next-line react/prop-types
  const { password } = props
  if (password === "") {
    return <></>
  }
  const res = zxcvbn(password)
  // eslint-disable-next-line camelcase
  const { guesses, crack_times_display, score, feedback } = res
  const lowerBound = crack_times_display.offline_fast_hashing_1e10_per_second
  const upperBound = crack_times_display.offline_slow_hashing_1e4_per_second
  return (
    <Card
      variant="outlined"
      style={{
        maxWidth: 1000,
        display: "block",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {/* eslint-disable-next-line camelcase */}
          Password Score: {getTextScore(score)}
        </Typography>
        <br />
        <Typography color="textSecondary" gutterBottom>
          It would take from <Chip color="secondary" label={lowerBound} /> to{" "}
          <Chip color="secondary" label={upperBound} /> to crack your password.
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          The computer needs to make {guesses.toFixed(0)} guesses.
        </Typography>
        {feedback.warning && (
          <Alert severity="warning">{feedback.warning}</Alert>
        )}
        <Typography color="textSecondary">
          Feedback:
          {feedback.suggestions.length > 0 ? (
            <ul>
              {feedback.suggestions.map((feedbackMsg) => (
                <li>{feedbackMsg}</li>
              ))}
            </ul>
          ) : (
            " Looking good!"
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function CreateGame() {
  const classes = useStyles()
  const [testPass, setTestPass] = useState("")

  const onTestPassChange = (e) => {
    setTestPass(e.target.value)
  }

  return (
    <Container maxWidth="lg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div>
            <Typography variant="h1" component="h1" className={classes.title}>
              A Moderately-Smart Password Checker
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.subtitle}
            >
              Test your password making skills! Implements Dropbox's{" "}
              <Link
                href="https://github.com/dropbox/zxcvbn"
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
              >
                zxcvbn package.
              </Link>
            </Typography>
            <TextField
              label="Type a Password!"
              variant="outlined"
              color="secondary"
              value={testPass}
              onChange={onTestPassChange}
            />
            <ZxcvbnResult password={testPass} />
          </div>
        </div>
      </section>
    </Container>
  )
}
