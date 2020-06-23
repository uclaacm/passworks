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
  let lessPasswords = 0;
  let morePasswords = 0;

  if (props.type === 'length') {
    lessPasswords = 10 ** 4;
    morePasswords = 10 ** props.inputLength;

    return (
      <>
        <Typography variant='h6'>
          What’s the relationship between password length and number of possible
          passwords?
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          For passwords using digits, there are 10 options for each
          character of the password. So, we can calculate the number of possible
          passwords as follows.
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          For a 4-digit password, there are<br />10<sup>4</sup>={lessPasswords}
          <br />possible passwords.</Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          The longer password you submitted had {props.inputLength} digits, and
          with {props.inputLength} digits there are<br/>
          10<sup>{props.inputLength}</sup>={morePasswords}<br/>possible
          passwords.
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          Thus, increasing the password’s length by {props.inputLength - 4} increases the
          number of possible passwords by<br/>
          {morePasswords} - {lessPasswords} = {morePasswords - lessPasswords}
        </Typography>
      </>
    );
  } else if (props.type === 'variety') {
    lessPasswords = 6 ** 6;
    morePasswords = 12 ** props.inputLength;

    return (
      <>
        <Typography variant='h6'>
          What’s the relationship between password length and number of possible
          passwords?
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          With only the first 6 lowercase letters, the number of options for
          each character is 6. On the other hand, with 6 lowercase letters and
          6 uppercase characters, the number of options for each character is
          12. So, we can calculate the number of possible passwords as follows.
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          For the lowercase password, there are<br />6<sup>6</sup>={lessPasswords}
          <br />possible passwords.</Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          With both uppercase and lowercase characters, there are<br/>
          12<sup>{props.inputLength}</sup>={morePasswords}<br/>possible
          passwords.
        </Typography>
        <Divider style={{ padding: 1, margin: 4 }} light />
        <Typography>
          Thus, by including both lowercase and uppercase characters in our
          password, we increase the number of possible passwords by<br/>
          {morePasswords} - {lessPasswords} = {morePasswords - lessPasswords}
        </Typography>
      </>
    );
  }
}
