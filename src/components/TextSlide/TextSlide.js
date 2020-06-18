import React from 'react';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

export default function TextSlide(props) {
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
            <Grid item sm={12}>
              {item}
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
