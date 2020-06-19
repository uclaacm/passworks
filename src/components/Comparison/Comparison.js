import React from 'react';
import MuiTypography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';

const Typography = withStyles(({
  root: {
    fontSize: '.9em',
    textAlign: 'center'
  }
}))(MuiTypography);

export default function Comparison(props) {
  if (props.type === 'length') {
    const shortPasswords = 10 ** 4;
    const longPasswords = 10 ** props.inputLength;

    return (
      <>
        <Typography variant='h6'>
          What's the relationship between password length and number of possible
          passwords?
        </Typography>
        <Divider light />
        <Typography>
          For passwords using digits, there are 10 options for each
          character of the password. So, we can calculate the number of possible
          passwords as follows.
        </Typography>
        <Divider light />
        <Typography>
          For a 4-digit password, there are<br />10<sup>4</sup>={shortPasswords}
          <br />possible passwords.</Typography>
        <Divider light />
        <Typography>
          The longer password you submitted had {props.inputLength} digits, and
          with {props.inputLength} digits there are<br/>
          10<sup>{props.inputLength}</sup>={longPasswords}<br/>possible
          passwords.
        </Typography>
        <Divider light />
        <Typography>
          Thus, increasing the password's length by {props.inputLength - 4} increases the
          number of possible passwords by<br/>
          {longPasswords} - {shortPasswords} = {longPasswords - shortPasswords}
        </Typography>
      </>
    )
  }
  else return null;
}
