import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';

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

// const alpha_lower = 'abcdefghijklmnopqrstuvwxyz';
// const alpha_mixed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const vowels_lower = 'aeiou';
const vowels_mixed = 'aeiouAEIOU';

export default function TextSlide(props) {
  const passwordGuesser = (
    (props.usesInput !== true) ? null :
    (props.inputType === 'num') ? (
      <CountUp
        start={0}
        duration={parseInt(props.userInput, 10) / 10000}
        end={parseInt(props.userInput, 10)}
        formattingFn={num => String(num).padStart(props.inputLength, '0')}
        useEasing={false}>
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <Button onClick={start}>Start</Button>
          </div>
        )}
      </CountUp>) : 
    (props.inputType === 'vowels') ? (
      <CountUp
        start={0}
        duration={fromLetters(props.userInput, vowels_lower) / 10000}
        end={fromLetters(props.userInput, vowels_lower)}
        formattingFn={num => toLetters(num, vowels_lower).padStart(props.inputLength, vowels_lower[0])}
        useEasing={false}>
          {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <Button onClick={start}>Start</Button>
          </div>
        )}
      </CountUp>
    ) : 
    (props.inputType === 'Vowels') ? (
      <CountUp
        start={0}
        duration={fromLetters(props.userInput, vowels_mixed) / 10000}
        end={fromLetters(props.userInput, vowels_mixed)}
        formattingFn={num => toLetters(num, vowels_mixed).padStart(props.inputLength, vowels_mixed[0])}
        useEasing={false}>
          {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <Button onClick={start}>Start</Button>
          </div>
        )}
      </CountUp>
    ) : null
  );

  const slidingItems = props.lessonItems.map((item, i) => {
    return (
      <Slide 
        direction="left" 
        in={props.count === i} 
        mountOnEnter 
        unmountOnExit
        key={i}
      >
          <Grid container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item sm={6}>
              {item}
              {passwordGuesser}
            </Grid>
          </Grid>
      </Slide>
    );
  });

  return (
    <>
      {slidingItems.map((slide, i) => {
        return (
          props.count === i ? slide : null
        );
      })}
    </>
  );
}
