import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ReactComponent as LandingImg } from './landing-img.svg';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: '5rem'
  },
  subtitle: {
    fontSize: '1.5rem',
    padding: '1rem'
  },
  start: {
    fontSize: '2rem',
    padding: '10px 40px'
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      width: 0
    }
  }
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <section class='hero is-fullheight'>
        <div class='hero-body'>
          <div>
            <Typography variant='h1' component='h1' className={classes.title}>
              Passworks
            </Typography>
            <Typography variant='body1' component='h2' className={classes.subtitle}>
              what makes a good password? more importantly, what makes a bad password?
              in this mini-lesson, we’ll teach you about various aspects of password
              security. we hope you have fun and learn something! 
            </Typography>
            <Button variant='contained' href='#MainSection' className={classes.start}>
              Start
            </Button>
          </div>
          <LandingImg className={classes.img} height='auto' width='auto'/>
        </div>
      </section>
    </Container>
  );
}
