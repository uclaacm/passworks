import React from 'react';
import Typography from '@material-ui/core/Typography';

/** keys and fields:
 *  slide: the text that should appear
 *  input: true if slide requires user input
 *  inputType: 'num', 'alpha', 
 *  inputDesc: describes the expected type of the user's input
 *  inputLength: the required length of the user's input
 *  regexp: regular expression matching the accepted inputs
 *  usesInput: true if slide requires result of last user input
 */   
export const lessonSlides = [
  [
    { 
      slide: <Typography>Why are long passwords more secure than short ones?
        Try submitting a 4-digit password!
        </Typography>,
      input: true,
      inputType: 'num',
      inputDesc: 'digits',
      inputLength: 4,
      regexp: /^\d{4}$/
    },
    {
      slide: <Typography>Press start to see how long it takes for a computer to
        guess your 4-digit password!
        </Typography>,
      usesInput: true,
      inputType: 'num',
      inputLength: 4
    },
    {
      slide: <Typography>Wow, that was really fast! Now let's try using
        a 6-digit password!
        </Typography>,
      input: true,
      inputType: 'num',
      inputDesc: 'digits',
      inputLength: 6,
      regexp: /^\d{6}$/
    },
    { 
      slide: <Typography>Let's see how long it takes for the computer
        to guess your 6-digit password!
      </Typography>,
      usesInput: true,
      inputType: 'num',
      inputLength: 6
    }
  ],
  [
    { slide: <Typography>Goodbye, world!</Typography>},
    { slide: <Typography>You finished our passworks lesson!</Typography>},
    { slide: <Typography>We hope you had fun :)</Typography>}
  ]
];
