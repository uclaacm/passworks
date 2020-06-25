import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    padding: '10px 0px'
  },
  profileImg: {
    width: '50px',
    height: '50px',
    float: 'left',
    padding: -5
  },
  headerName: {
    fontWeight: 600,
    fontSize: '1.1em',
    lineHeight: '1em'
  },
  smallerText: {
    fontSize: '0.9em'
  },
  capName: {
    fontWeight: 600,
    fontSize: '1em',
    lineHeight: '1em'
  },
  caption: {
    fontweight: 400,
    fontSize: '1em'
  },
  timestamp: {
    fontSize: '.8em',
    color: '#eeeeeee'
  }
});

export default function Post(props) {
  const classes = useStyles();

  return (
    <li className={classes.root}>
      <Box display='flex' direction='row' alignItems='center' className={classes.header}>
        <img src={props.profileImg} alt='profile pic' className={classes.profileImg} />
        <div>
          <Typography variant='body1' className={classes.headerName}>{props.poster}</Typography>
          <Typography variant='body1' className={classes.smallerText}>{props.location}</Typography>
        </div>
      </Box>
      <img src={props.postImg} alt='instagram post' width='100%' ></img>
      <Typography variant='body1' className={classes.smallerText}>{props.likes + ' likes'}</Typography>
      <Typography variant='body1' className={classes.caption}>
        <Box className={classes.capName} component='span'>{props.poster}</Box>
        {' ' + props.caption}
      </Typography>
      <Typography className={classes.timestamp}>{props.date}</Typography>
    </li>
  );
}