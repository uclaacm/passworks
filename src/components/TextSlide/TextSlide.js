import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
  slideText: {
    textAlign: 'center'
  }
});

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
            justify='center'
            alignItems='center'
          >
            <Grid item sm={12}>
              <Typography variant='body1' className={classes.slideText}>{item}</Typography>
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
