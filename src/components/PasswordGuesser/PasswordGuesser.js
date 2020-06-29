import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

import GuesserAndTimer from "./GuesserAndTimer/GuesserAndTimer"

// function to convert a number to a string based on the given alphabet
//    example: if alphabet is 'abc',
//      0 -> 'a'
//      1 -> 'b'
//      2 -> 'c'
//      3 -> 'aa'
//      4 -> 'ab'
//      5 -> 'ac'
//      6 -> 'ba'
//      ...
function toLetters(num, alphabet) {
  const mod = num % alphabet.length
  const pow = Math.floor(num / alphabet.length)
  const out = alphabet[mod]
  return pow ? toLetters(pow, alphabet) + out : out
}

// function to convert a string to a number based on the given alphabet
// see example for toLetters
function fromLetters(str, alphabet) {
  let out = 0
  const len = str.length
  let pos = len
  while (pos > 0) {
    pos -= 1
    out += alphabet.indexOf(str[pos]) * alphabet.length ** (len - 1 - pos)
  }
  return out
}

const alphaLower = "abcdef"
const alphaMixed = "abcdefABCDEF"

export default function PasswordGuesser({ userInput, inputType }) {
  let genEnd
  let speed
  let duration
  let decimals
  let genFormattingFn

  if (inputType === "num") {
    genEnd = parseInt(userInput, 10)
    speed = 100000
    decimals = 5
    duration = genEnd / speed
    genFormattingFn = (num) => {
      return String(num).padStart(userInput.length, "0")
    }
  } else if (inputType === "alpha") {
    genEnd = fromLetters(userInput, alphaLower)
    speed = 10000
    decimals = 4
    duration = genEnd / speed
    genFormattingFn = (num) => {
      return toLetters(num, alphaLower).padStart(
        userInput.length,
        alphaLower[0]
      )
    }
  } else if (inputType === "Alpha") {
    genEnd = fromLetters(userInput, alphaMixed)
    speed = 10000
    decimals = 4
    duration = genEnd / speed
    genFormattingFn = (num) => {
      return toLetters(num, alphaMixed).padStart(
        userInput.length,
        alphaMixed[0]
      )
    }
  }

  const timeFormattingFn = (num) => {
    const min = Math.floor(num / 60)
    const sec = num % 60
    return min !== 0
      ? `${String(min)}m ${sec.toFixed(decimals)}s`
      : `${sec.toFixed(decimals)}s`
  }

  let speedStr
  if (inputType === "num") {
    speedStr = "100,000"
  } else {
    speedStr = "10,000"
  }

  return (
    <>
      <Typography style={{ textAlign: "center", paddingBottom: ".5em" }}>
        Your password was {userInput}.
      </Typography>
      <GuesserAndTimer
        genEnd={genEnd}
        duration={duration}
        decimals={decimals}
        genFormattingFn={genFormattingFn}
        timeFormattingFn={timeFormattingFn}
      />
      <Typography style={{ fontSize: ".8em", paddingTop: "1.25em" }}>
        Note: The animation above is set to generate {speedStr} passwords per
        second. In reality, the average laptop/computer can easily perform
        hundreds of millions of calculations per second.
      </Typography>
    </>
  )
}

PasswordGuesser.propTypes = {
  userInput: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
}
