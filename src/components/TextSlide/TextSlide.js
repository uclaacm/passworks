import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 180,
  },
  wrapper: {
    width: 200,
  }
}));

export default function TextSlide(props) {
  const classes = useStyles();

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
        >
          {item}
          {(props.lessonSlides[props.count].usesInput === true) ? 
            <>
            {/* Hello, you submitted {props.userInput} */}
            <CountUp
              start={0}
              end={props.userInput}
              // separator=" "
              formattingFn={num => {
                let inputLen = props.lessonSlides[props.count - 1].inputLength;
                return ("0".repeat(inputLen) + num).slice(-inputLen);
              }}
              onEnd={() => console.log('Ended! 👏')}
              onStart={() => console.log('Started! 💨')}
            >
              {({ countUpRef, start }) => (
                <div>
                  <span ref={countUpRef} />
                  <button onClick={start}>Start</button>
                </div>
              )}
            </CountUp>
            </> : null}
        </Grid>
      </Slide>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {slidingItems.map((slide, i) => {
          return (
            props.count === i ? slide : null
          );
        })}
      </div>
    </div>
  );
}
