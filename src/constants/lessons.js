import React from 'react';
import Typography from '@material-ui/core/Typography';

export const lessonSlides = [
  [
    { 
      slide: <Typography>Why are long passwords more secure than short ones?
        Try submitting a 4-digit password!
        </Typography>,
      input: true,
      inputType: 'num',
      inputLength: 4
    },
    {
      slide: <Typography>Let's see how long it takes for a computer to
        guess your 4-digit password!
        </Typography>
    },
    {
      slide: <Typography>Wow, that was really fast! Now let's try using
        a 6-digit password!
        </Typography>,
      input: true,
      inputType: 'num',
      inputLength: 6
    },
    { 
      slide: <Typography>Let's see how long it takes for the computer
        to guess your 6-digit password!
      </Typography>
    }
  ],
  [
    { slide: <Typography>Goodbye, world!</Typography>},
    { slide: <Typography>You finished our passworks lesson!</Typography>},
    { slide: <Typography>We hope you had fun :)</Typography>}
  ]
];
