/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react"

import makeStyles from "@material-ui/core/styles/makeStyles"
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import goodLengthPWs from "../../constants/good-bois.json"
import badLengthPWs from "../../constants/bad-bois.json"
import goodOriginalPWs from "../../constants/hard.json"
import badOriginalPWs from "../../constants/easy.json"

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

// shamelessly taken from https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandom(arr, n) {
  const result = new Array(n)
  let len = arr.length
  const taken = new Array(len)
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available")
  // eslint-disable-next-line no-param-reassign
  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

const getQuestionSet = () => {
  // seed picks what set of PWs to pick from: originality or length
  const seed = Math.floor(Math.random() * 2)
  const goodArr = seed ? goodLengthPWs : goodOriginalPWs
  const badArr = seed ? badLengthPWs : badOriginalPWs

  // now, we populate 3 bad answers and one good answer
  const correctPos = Math.floor(Math.random() * 4)
  const options = getRandom(badArr, 3)
  const randCorrect = goodArr[Math.floor(Math.random() * goodArr.length)]
  options.splice(correctPos, 0, randCorrect)
  return {
    correct: correctPos + 1,
    questions: options,
  }
}

export default function PickGame() {
  const classes = useStyles()

  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [correctState, setCorrectState] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [possibleAnswers, setPossibleAnswers] = useState([])

  const handleChange = (e) => {
    setCurrentAnswer(Number(e.target.value))
  }

  const checkCurrentAnswer = () => {
    // eslint-disable-next-line no-unused-expressions
    currentAnswer === correctAnswer ? setCorrectState(1) : setCorrectState(2)
  }

  const newQuestions = () => {
    setCurrentAnswer(0)
    setCorrectState(0)
    const { correct, questions } = getQuestionSet()
    setCorrectAnswer(correct)
    setPossibleAnswers(questions)
  }

  useEffect(newQuestions, [])

  return (
    <Container maxWidth="lg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div>
            <Typography variant="h1" component="h1" className={classes.title}>
              The Best Guess Quest for no Password Mess, Just to Flex
            </Typography>
            <Card>
              <CardContent>
                {correctState > 0 && (
                  <Alert severity={correctState === 1 ? "success" : "error"}>
                    {correctState === 1
                      ? "You were correct! You're a protective password professional!"
                      : `Unfortunately, the correct answer was ${
                          possibleAnswers[correctAnswer - 1]
                        }. You'll get 'em next time!`}
                  </Alert>
                )}
                <Typography
                  variant="body1"
                  component="h2"
                  className={classes.subtitle}
                >
                  Select what you think is the best password!
                </Typography>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="correct password"
                      name="correct password"
                      value={String(currentAnswer)}
                      onChange={handleChange}
                    >
                      {possibleAnswers.map((answer, index) => (
                        <FormControlLabel
                          key={answer}
                          value={String(index + 1)}
                          control={<Radio />}
                          label={answer}
                        />
                      ))}
                    </RadioGroup>
                    <FormHelperText>
                      Don't forget everything we've talked about :)
                    </FormHelperText>
                  </FormControl>
                </div>
                <Button variant="contained" onClick={checkCurrentAnswer}>
                  Check Your Answer
                </Button>
                <Button variant="contained" onClick={newQuestions}>
                  New Options!
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Container>
  )
}
