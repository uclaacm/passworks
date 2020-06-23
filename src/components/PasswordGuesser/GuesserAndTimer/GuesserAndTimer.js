import React from 'react';
import { useCountUp } from 'react-countup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles({
  counter: {
    fontSize: '2em',
    fontFamily: 'Monospace',
    letterSpacing: 6,
    textAlign: 'center'
  },
  start: {
    height: '2em',
    fontSize: '1em',
    fontWeight: 400,
    marginTop: 10
  },
  text: {
    textAlign: 'center'
  },
  timer: {
    fontSize: '1.5em',
    fontFamily: 'Monospace',
    textAlign: 'center',
    paddingTop: '.25em'
  }
});

export default function GuesserAndTimer(props) {
  const classes = useStyles();

  const { countUp: countUp1, start: start1 } = useCountUp({
    start: 0,
    end: props.genEnd,
    duration: props.duration,
    delay: 10,
    useEasing: false,
    formattingFn: props.genFormattingFn
  });

  const { countUp: countUp2, start: start2 } = useCountUp({
    start: 0,
    end: props.duration,
    duration: props.duration,
    delay: 10,
    decimals: props.decimals,
    useEasing: false,
    formattingFn: props.timeFormattingFn
  });

  const start = () => {
    start1();
    start2();
  }

  return (
    <>
      <Box className={classes.counter}>
        <div>{countUp1}</div>
      </Box>
      <Button disableRipple onClick={start} variant='contained' disableElevation>
        Start
      </Button>
      <Box className={classes.timer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TimerIcon style={{ fontSize: '1em', marginRight: '5px' }}/>
          {countUp2}
        </div>
      </Box>
    </>
  );
};
