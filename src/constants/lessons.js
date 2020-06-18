import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PasswordGuesser from '../components/PasswordGuesser/PasswordGuesser.js';
import Profile from '../components/Profile/Profile.js';
import CommonPassword from '../components/CommonPassword/CommonPassword.js';
import Browser from '../components/Browser/Browser';

const guesser = (userInput, inputType, inputLength) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <PasswordGuesser
        usesInput={true}
        userInput={userInput}
        inputType={inputType}
        inputLength={inputLength}
      />
    </Box>
  );
}

const inputForm = (classes, value, handleInputChange, handleInputSubmit, inputError, errorString) => {
  return (
    <form onSubmit={handleInputSubmit}>
      <Box display='flex' flexDirection='column' alignItems='center'>
          <input type='text' className={classes.inputText}
            value={value} onChange={handleInputChange} />
          <Typography color='error' style={{ textAlign: 'center' }}>{inputError ? errorString : null}</Typography>
          <Button disableRipple variant='outlined' type='submit'>Submit</Button>
      </Box>
    </form>
  );
}

const browser = (count, setCount) => {
  return (
    <Browser
      count={count}
      setCount={setCount}
    />
  )
}

/** keys and fields:
 *  slide: the text that should appear
 *  input: true if slide requires user input
 *  inputType: 'num', 'alpha', 'Alpha', 'common'
 *  inputDesc: a more verbose description the expected type of the user's input
 *  inputLength: the required/expected length of the user's input
 *  checkInput: predicate that returns true if input was valid, false otherwise
 *  usesInput: true if slide requires result of last user input
 */
export const allLessons = [
  [
    {
      title: <>Lesson 1: Password Length</>,
      slide: <>First, let’s learn about why long passwords are more secure
        than short passwords!</>,
      phoneContent: null
    },
    { 
      slide: <>Try submitting a 4-digit password!</>,
      input: true,
      inputType: 'num',
      inputDesc: '4 digits',
      inputLength: 4,
      checkInput: str => /^\d{4}$/.test(str),
      phoneContent: inputForm
    },
    {
      slide: <>Press start to see how long it takes for a computer to
        guess your 4-digit password!</>,
      usesInput: true,
      inputType: 'num',
      inputLength: 4,
      phoneContent: guesser
    },
    {
      slide: <>Wow, that was really fast! Now let’s try using
        a longer password! Enter a password consisting of 6–12 digits.
        </>,
      input: true,
      inputType: 'num',
      inputDesc: '6 to 12 digits',
      inputLength: -1,
      checkInput: str => /^\d{6,12}$/.test(str),
      phoneContent: inputForm
    },
    { 
      slide: <>Let’s see how long it takes for the computer
        to guess your longer password! This might take a while, so feel free
        to click the next button if you’re tired of waiting :)</>,
      usesInput: true,
      inputType: 'num',
      inputLength: -1,
      phoneContent: guesser
    },
    {
      slide: <>Depending on exactly which numbers you picked for your
        passwords, you should have noticed that the longer password took much
        more time to crack than the 4-digit password! This is because as you
        increase the length of your password, there are more and more possible
        values for your password to have.</>,
      phoneContent: null
    }
  ],
  [
    // The lesson uses just vowels instead of the full a-z set of characters. This
    // is to reduce the size of the alphabet and thus add more flexibility with
    // the length of passwords we can generate in a reasonable time. Also, just
    // using vowels (as opposed to a full alphabet or just consonants) circumvents
    // the need to check for profanity.
    { 
      title: <>Lesson 2: Password Variety</>,
      slide: <>You’ll often see sites recommend that you use
        uppercase letters, numbers, and symbols in your password. Why is that?
        </>,
      phoneContent: null
    },
    { 
      slide: <>Try submitting a 6-letter password with just lowercase
        vowels (a e i o u), and we’ll see how long it takes for the computer to guess it!
        </>,
      input: true,
      inputType: 'alpha',
      inputDesc: '6 lowercase vowels',
      inputLength: 6,
      checkInput: str => /^[aeiou]{6}$/.test(str),
      phoneContent: inputForm
    },
    { 
      slide: <>Press start to see how long it takes for a computer to
        guess your 6-letter lowercase password!
        </>,
      usesInput: true,
      inputType: 'alpha',
      inputLength: 6,
      phoneContent: guesser
    },
    { 
      slide: <>Now let’s try adding some variety to our password.
      Submit another 6-vowel password, this time mixing lowercase and uppercase
      vowels (a e i o u A E I O U). Include at least two uppercase vowels!
        </>,
      input: true,
      inputType: 'Alpha',
      inputDesc: '6 vowels, with at least 2 uppercase vowels',
      inputLength: 6,
      checkInput: str => /.*[AEIOU].*[AEIOU].*/.test(str) && /^[aeiouAEIOU]{6}$/.test(str),
      phoneContent: inputForm
    },
    { 
      slide: <>Press start to see how long it takes for a computer to
        guess your 6-letter mixed-case password!
        </>,
      usesInput: true,
      inputType: 'Alpha',
      inputLength: 6,
      phoneContent: guesser
    },
    {
      slide: <>Hopefully, you saw that the mixed-case password took
        longer to generate! This is because when we introduce more variety in
        what letters we use, each character of the password can take on more
        values. Thus, there are more possible passwords we can make, making it
        harder to guess!</>,
      phoneContent: null
    }
  ],
  [
    { 
      title: <>Lesson 3: Don’t Be Basic</>,
      slide: <>Another important aspect of password security is
        randomness. Phrases like "happy", "jackie", and "asdfghjkl"
        are NOT secure passwords, because they aren’t very random and are thus
        quite popularly used. In fact, there are many lists available containing
        the most popularly used passwords.</>,
      phoneContent: null
    },
    { 
      slide: <>Try experimenting with submitting passwords (of 4 or
        more characters) and seeing which ones are in the list of the 10,000 most
        common passwords.</>,
      phoneContent: () => <CommonPassword />
    },
    {
      slide: <>Though it’s a good sign if your password isn’t in the list,
        it still may not be secure enough. For example, "h3ll0" isn’t on this list,
        but it’s common for hackers to try tricks like substituting letters for numbers
        and "h3ll0" thus would be fairly easy to crack. Also, there are much bigger
        lists with millions of common passwords, so just because a password isn’t
        on the list we checked does not mean it is hack-proof.</>,
      phoneContent: null
    }
  ],
  [
    {
      title: <>Lesson 4: Social Engineering</>,
      slide: <>In this lesson, we’ll learn about social engineering. <br />
      Social engineering is the act of digging into someone’s personal
      information to gain access into things like their accounts. <br/> Note:
      This demonstration is for educational purposes only. We do not condone
      hacking into other people’s accounts.</>,
      phoneContent: () => <Profile />
    },
    {
      slide: <>Suppose we want to hack into our "friend" Jason’s account. We’ve
        successfully entered his username and password, but this account requires
        us to answer some security questions! Luckily, we have access to his Instagram
        posts, so let’s see if we can guess the right answers by doing a little research!</>,
      input: true,
      slideAdd: browser,
      phoneContent: () => <Profile />
    },
    {
      slide: <>As you can see, social engineering is quite powerful!</>,
      phoneContent: () => <Profile />
    }
  ]
];
