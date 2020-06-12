import React from 'react';
import Typography from '@material-ui/core/Typography';

/** keys and fields:
 *  slide: the text that should appear
 *  input: true if slide requires user input
 *  inputType: 'num', 'vowels', 'Vowels'
 *  inputDesc: a more verbose description the expected type of the user's input
 *  inputLength: the required/expected length of the user's input
 *  checkInput: predicate that returns true if input was valid, false otherwise
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
      checkInput: str => /^\d{4}$/.test(str)
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
      checkInput: str => /^\d{6}$/.test(str)
    },
    { 
      slide: <Typography>Let's see how long it takes for the computer
        to guess your 6-digit password! This might take a while, so feel free
        to click the next button if you're tired of waiting :)
      </Typography>,
      usesInput: true,
      inputType: 'num',
      inputLength: 6
    },
    {
      slide: <Typography>Though it depends somewhat on which numbers you
        picked for your passwords, you should have noticed that the 6-digit
        password took a lot longer to crack than the 4-digit password! This is
        because there are many more possible values you can make with 6 digits
        compared to with 4 digits.
      </Typography>
    }
  ],
  [
    // The lesson uses just vowels instead of the full a-z set of characters. This
    // is to reduce the size of the alphabet and thus add more flexibility with
    // the length of passwords we can generate in a reasonable time. Also, just
    // using vowels (as opposed to a full alphabet or just consonants) circumvents
    // the need to check for profanity.
    { 
      slide: <Typography>You’ll often see sites recommend that you use
        uppercase letters, numbers, and symbols in your password. Why is that?
        </Typography>
    },
    { 
      slide: <Typography>Try submitting a 6-letter password with just lowercase
        vowels (a e i o u), and we'll see how long it takes for the computer to guess it!
        </Typography>,
      input: true,
      inputType: 'vowels',
      inputDesc: 'lowercase vowels',
      inputLength: 6,
      checkInput: str => /^[aeiou]{6}$/.test(str)
    },
    { 
      slide: <Typography>Press start to see how long it takes for a computer to
        guess your 6-letter lowercase password!
        </Typography>,
      usesInput: true,
      inputType: 'vowels',
      inputLength: 6
    },
    { 
      slide: <Typography>Now try submitting another 6-vowel password, this time
        mixing lowercase and uppercase vowels (a e i o u A E I O U). Include at
        least one uppercase vowel!
        </Typography>,
      input: true,
      inputType: 'Vowels',
      inputDesc: 'mixed upper and lower case vowels',
      inputLength: 6,
      checkInput: str => /.*[AEIOU].*/.test(str) && /^[aeiouAEIOU]{6}$/.test(str)
    },
    { 
      slide: <Typography>Press start to see how long it takes for a computer to
        guess your 6-letter mixed-case password!
        </Typography>,
      usesInput: true,
      inputType: 'Vowels',
      inputLength: 6
    },
    {
      slide: <Typography>Hopefully, you saw that the mixed-case password took
        longer to generate! This is because when we introduce more character
        variety, there are more possible passwords that can be generated!
      </Typography>
    }
  ],
  [
    { 
      slide: <Typography>Another important aspect of password security is
        randomness. Phrases like "happy", "jackie", and "asdfghjkl"
        are NOT secure passwords, because they aren't very random and are thus
        quite popularly used. In fact, there are many lists available containing
        the most popularly used passwords.
      </Typography>
    },
    { 
      slide: <Typography>Try experimenting with submitting a password (of 4 or
        more characters), and we'll see if it's in the list of the 10,000 most
        common passwords.
      </Typography>,
      input: true,
      inputType: 'common',
      inputLength: -1,
      checkInput: str => /^.{4,}$/.test(str)
    },
    {
      usesInput: true,
      inputType: 'common',
      inputLength: -1,
    }
  ]
];
