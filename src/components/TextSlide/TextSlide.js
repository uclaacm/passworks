import React from 'react';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 180,
  },
  wrapper: {
    // width: 150,
  }
}));

export default function TextSlide(props) {
  const classes = useStyles();

  const lessonSlides = props.lessonItems.map((item, i) => {
    return (
      <Slide 
        direction="left" 
        in={props.count === i} 
        mountOnEnter 
        unmountOnExit
        key={i}
      >
        {item}
      </Slide>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {lessonSlides.map((slide, i) => {
          return (
            props.count === i ? slide : null
          );
        })}
      </div>
    </div>
  );
}
