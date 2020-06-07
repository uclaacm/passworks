import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
            Hello, you submitted {props.userInput}
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
