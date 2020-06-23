import React from 'react';
import Typography from '@material-ui/core/Typography';

import GuesserAndTimer from './GuesserAndTimer/GuesserAndTimer.js';

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
  const mod = num % alphabet.length;
  const pow = Math.floor(num / alphabet.length);
  const out = alphabet[mod];
  return pow ? toLetters(pow, alphabet) + out : out;
}

// function to convert a string to a number based on the given alphabet
// see example for toLetters
function fromLetters(str, alphabet) {
  var out = 0, len = str.length, pos = len;
  while (--pos > -1) {
      out += (alphabet.indexOf(str[pos])) * Math.pow(alphabet.length, len - 1 - pos);
  }
  return out;
}

const alpha_lower = 'abcdef';
const alpha_mixed = 'abcdefABCDEF';

export default function PasswordGuesser(props) {
  let genEnd;
  let speed;
  let duration;
  let decimals;
  let genFormattingFn, timeFormattingFn;

  if (props.inputType === 'num') {
    genEnd = parseInt(props.userInput, 10);
    speed = 100000;
    decimals = 5;
    duration = genEnd / speed;
    genFormattingFn = num => {
      return String(num).padStart(props.userInput.length, '0');
    }
  } else if (props.inputType === 'alpha') {
    genEnd = fromLetters(props.userInput, alpha_lower);
    speed = 10000;
    decimals = 4;
    duration = genEnd / speed;
    genFormattingFn = num => {
      return toLetters(num, alpha_lower).padStart(props.userInput.length, alpha_lower[0]);
    }
  } else if (props.inputType === 'Alpha') {
    genEnd = fromLetters(props.userInput, alpha_mixed);
    speed = 10000;
    decimals = 4;
    duration = genEnd / speed;
    genFormattingFn = num => {
      return toLetters(num, alpha_mixed).padStart(props.userInput.length, alpha_mixed[0]);
    }
  }

  timeFormattingFn = num => {
    const min = Math.floor(num / 60);
    const sec = num % 60;
    return (
      min !== 0 ? 
        (String(min) + 'm ' + sec.toFixed(decimals) + 's') :
        sec.toFixed(decimals) + 's'
    );
  }

  var speedStr;
  if (props.inputType === 'num') {
    speedStr = '100,000';
  } else {
    speedStr = '10,000';
  }

  return (
    <>
      <Typography style={{ textAlign: 'center', paddingBottom: '.5em' }}>Your password was {props.userInput}.</Typography>
      <GuesserAndTimer 
        genEnd={genEnd}
        duration={duration}
        decimals={decimals}
        genFormattingFn={genFormattingFn}
        timeFormattingFn={timeFormattingFn}
      />
      <Typography style= {{ fontSize: '.8em', paddingTop: '1.25em', textAlign: 'center' }}>
        Note: The animation above is set to generate {speedStr} passwords per second.
        In reality, the average laptop/computer can easily perform hundreds
        of millions of calculations per second.
      </Typography>
    </>
  );
}
