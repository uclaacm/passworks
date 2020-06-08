import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';

export default function TextSlide(props) {
  const passwordGuesser = (
    (props.usesInput !== true) ? null :
    (props.inputType === 'num') ? (
      <CountUp
        start={0}
        duration={1/10000 * parseInt(props.userInput, 10)}
        end={parseInt(props.userInput, 10)}
        formattingFn={num => ("0".repeat(props.inputLength) + num).slice(-props.inputLength)}
        useEasing={false}>
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <Button onClick={start}>Start</Button>
          </div>
        )}
      </CountUp>) : null
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
