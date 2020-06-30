import React from "react"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import MuiTypography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import PasswordGuesser from "../components/PasswordGuesser/PasswordGuesser"
import Profile from "../components/Profile/Profile"
import CommonPassword from "../components/CommonPassword/CommonPassword"
import Browser from "../components/Browser/Browser"
import Comparison from "../components/Comparison/Comparison"
import Chat from "../components/Chat/Chat"

import { fromLetters, alphaLower, alphaMixed } from "../util/password"

const Typography = withStyles((theme) => ({
  root: {
    fontSize: "1em",
    padding: "10px",
    fontFamily: theme.typography.fontFamily,
  },
}))(MuiTypography)

const guesser = (userInput, inputType) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <PasswordGuesser userInput={userInput} inputType={inputType} />
    </Box>
  )
}

const formatTime = (num) => {
  const min = Math.floor(num / 60)
  const sec = num % 60
  return min !== 0 ? `${String(min)}m ${sec.toFixed(5)}s` : `${sec.toFixed(5)}s`
}

const timeDifference = (userInput1, userInput2, inputType) => {
  let duration1
  let duration2

  if (inputType === "num") {
    duration1 = parseInt(userInput1, 10) / 100000
    duration2 = parseInt(userInput2, 10) / 100000
  } else if (inputType === "alpha") {
    duration1 = fromLetters(userInput1, alphaLower) / 10000
    duration2 = fromLetters(userInput2, alphaMixed) / 10000
  }

  return (
    <>
      <Typography style={{ textAlign: "center", paddingBottom: ".5em" }}>
        Your first password was {userInput1}, taking {formatTime(duration1)} to
        generate!
      </Typography>
      <Typography style={{ textAlign: "center", paddingBottom: ".5em" }}>
        Your second password was {userInput2}, taking {formatTime(duration2)} to
        generate!
      </Typography>
    </>
  )
}

const inputForm = (
  classes,
  value,
  handleInputChange,
  handleInputSubmit,
  inputError,
  errorString,
  randomButton
) => {
  return (
    <form onSubmit={handleInputSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <input
          type="text"
          className={classes.inputText}
          value={value}
          onChange={handleInputChange}
        />
        {inputError ? (
          <Typography color="error" style={{ textAlign: "center" }}>
            {errorString}
          </Typography>
        ) : null}
        <Box>
          <Button
            disableRipple
            variant="contained"
            disableElevation
            type="submit"
          >
            Submit
          </Button>
          {randomButton}
        </Box>
      </Box>
    </form>
  )
}

const randomInt = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandom = (str, n) => {
  let result = ""
  for (let i = 0; i < n; i += 1) {
    result += str.charAt(Math.floor(Math.random() * str.length))
  }
  return result
}

const shuffleString = (str) => {
  const res = str.split("")
  for (let i = res.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i)
    const temp = res[i]
    res[i] = res[j]
    res[j] = temp
  }
  return res.join("")
}

const comparison = (type, inputLength) => {
  return <Comparison type={type} inputLength={inputLength} />
}

let chatKey = 0

const getChatKey = () => {
  chatKey += 1
  return chatKey
}

/** keys and fields:
 *  slide: the text that should appear
 *  input: true if slide requires user input
 *  inputType: 'num', 'alpha', 'Alpha', 'common'
 *  inputDesc: a more verbose description the expected type of the user’s input
 *  inputLength: the required/expected length of the user’s input
 *  checkInput: predicate that returns true if input was valid, false otherwise
 *  defaultInput: callback to randomly generated a default password
 *  phoneContent: what to render on the phone
 */
export default [
  [
    {
      title: <>Lesson 1: Password Length</>,
      slide: (
        <>
          <Typography>
            First, let’s learn about why long passwords are more secure than
            short passwords! Password guessers often use brute force techniques
            to break into accounts by checking all possible passwords until the
            right one is found.
          </Typography>
          <Typography>
            In this lesson, we’ll demonstrate how long passwords are less
            susceptible to brute force attacks than short passwords.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            { type: "sent", pos: "last", contents: <>help</> },
            { type: "rec", pos: "", contents: <>yo</> },
            { type: "rec", pos: "last", contents: <>what’s up?</> },
            {
              type: "sent",
              pos: "last",
              contents: <>i need to learn about secure passwords</>,
            },
            { type: "rec", pos: "", contents: <>hmm... ok</> },
            {
              type: "rec",
              pos: "last",
              contents: <>my first tip is to make sure it’s not too short</>,
            },
          ]}
        />
      ),
    },
    {
      slide: (
        <Typography>
          Type a 4-digit password (or press Randomize to generate one
          automatically), and press Submit!
        </Typography>
      ),
      input: true,
      inputNum: 1,
      inputType: "num",
      inputDesc: "4 digits",
      inputLength: 4,
      checkInput: (str) => /^\d{4}$/.test(str),
      defaultInput: () => getRandom("0123456789", 4),
      phoneContent: inputForm,
    },
    {
      slide: (
        <Typography>
          Press Start to see how long it takes for a brute force password
          guesser to generate your 4-digit password!
        </Typography>
      ),
      inputType: "num",
      inputLength: 4,
      phoneContent: guesser,
    },
    {
      slide: (
        <Typography>
          Wow, that was really fast! Now let’s try using a longer password!
          Enter a password consisting of 6–12 digits.
        </Typography>
      ),
      input: true,
      inputNum: 2,
      inputType: "num",
      inputDesc: "6 to 12 digits",
      inputLength: -1,
      checkInput: (str) => /^\d{6,12}$/.test(str),
      defaultInput: () => {
        const len = randomInt(6, 12)
        return getRandom("0123456789", len)
      },
      phoneContent: inputForm,
    },
    {
      slide: (
        <Typography>
          Press Start to see how long it takes for the password generator to
          guess your longer password! This might take a while, so feel free to
          click the next button if you don’t want to wait.
        </Typography>
      ),
      inputType: "num",
      usesInput2: true,
      inputLength: -1,
      phoneContent: guesser,
    },
    {
      slide: (
        <Typography>Take a look at the time comparison on the left!</Typography>
      ),
      timeDifference: true,
      phoneContent: (userInput1, userInput2) =>
        timeDifference(userInput1, userInput2, "num"),
    },
    {
      slide: (
        <>
          <Typography>
            Depending on exactly which numbers you picked for your passwords,
            you should have noticed that the longer password took much more time
            to crack than the 4-digit password!
          </Typography>
          <Typography className="takeaway" style={{ marginBottom: "10px" }}>
            Short passwords can be very easily cracked with a simple brute-force
            technique. So, it’s important to make sure your passwords aren’t too
            short.
          </Typography>
        </>
      ),
      comparison: true,
      phoneContent: (inputLength) => comparison("length", inputLength),
    },
  ],
  [
    // The lesson uses just vowels instead of the full a-z set of characters. This
    // is to reduce the size of the alphabet and thus add more flexibility with
    // the length of passwords we can generate in a reasonable time. Also, just
    // using vowels (as opposed to a full alphabet or just consonants) circumvents
    // the need to check for profanity.
    {
      title: <>Lesson 2: Password Variety</>,
      slide: (
        <>
          <Typography>
            You might have noticed that many sites require you to use a
            combination of lowercase letters, uppercase letters, numbers, and
            symbols in your passwords.
          </Typography>
          <Typography>
            In this lesson, we’ll use a brute force password guesser to
            demonstrate why it’s important to use a variety of symbols in your
            passwords.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            {
              type: "sent",
              pos: "",
              contents: <>alright, i guess i should make my passwords longer</>,
            },
            { type: "sent", pos: "last", contents: <>any other tips??</> },
            {
              type: "rec",
              pos: "last",
              contents: (
                <>
                  pLeasE iNcluDe aT lEAst 1 caPitaL LeTTer aND 1 sYMbol iN yOUr
                  PasSWorD
                </>
              ),
            },
            { type: "sent", pos: "last", contents: <>ugh</> },
            { type: "rec", pos: "last", contents: <>but for real though</> },
          ]}
        />
      ),
    },
    {
      slide: (
        <Typography>
          Submit a lowercase 6-letter password using only the first 6 letters of
          the alphabet (a b c d e f), and we’ll see how long it takes for the
          computer to guess it!
        </Typography>
      ),
      input: true,
      inputNum: 1,
      inputType: "alpha",
      inputDesc: "6 lowercase letters from (a b c d e f)",
      inputLength: 6,
      checkInput: (str) => /^[abcdef]{6}$/.test(str),
      defaultInput: () => getRandom("abcdef", 6),
      phoneContent: inputForm,
    },
    {
      slide: (
        <Typography>
          Press Start to see how long it takes for a computer to guess your
          6-letter lowercase password!
        </Typography>
      ),
      inputType: "alpha",
      inputLength: 6,
      phoneContent: guesser,
    },
    {
      slide: (
        <Typography>
          Now, let’s try adding some variety to our password by including
          uppercase letters. Submit another 6-letter password, this time mixing
          lowercase and uppercase letters (a b c d e f A B C D E F). Include at
          least two uppercase letters!
        </Typography>
      ),
      input: true,
      inputNum: 2,
      inputType: "Alpha",
      inputDesc: "6 letters from (a b c d e f), with at least 2 uppercase",
      inputLength: 6,
      checkInput: (str) =>
        /.*[ABCDEF].*[ABCDEF].*/.test(str) && /^[abcdefABCDEF]{6}$/.test(str),
      defaultInput: () => {
        const numUppercase = randomInt(2, 6)
        const lowercase = getRandom("abcdef", 6 - numUppercase)
        const uppercase = getRandom("ABCDEF", numUppercase)
        return shuffleString(lowercase + uppercase)
      },
      phoneContent: inputForm,
    },
    {
      slide: (
        <Typography>
          Press Start to see how long it takes for a computer to guess your
          6-letter mixed-case password!
        </Typography>
      ),
      usesInput2: true,
      inputType: "Alpha",
      inputLength: 6,
      phoneContent: guesser,
    },
    {
      slide: (
        <Typography>Take a look at the time comparison on the left!</Typography>
      ),
      timeDifference: true,
      phoneContent: (userInput1, userInput2) =>
        timeDifference(userInput1, userInput2, "alpha"),
    },
    {
      slide: (
        <>
          <Typography>
            Hopefully, you saw that your mixed-case password took longer for the
            brute force password guesser to generate!
          </Typography>
          <Typography className="takeaway" style={{ marginBottom: "10px" }}>
            When you use more symbols in your password, it’s harder to use brute
            force to crack it because the guesser has to try more combinations.
            So, you should try to include a variety of different types of
            characters in your passwords.
          </Typography>
        </>
      ),
      comparison: true,
      phoneContent: (inputLength) => comparison("variety", inputLength),
    },
  ],
  [
    {
      title: <>Lesson 3: Don’t Be Basic</>,
      slide: (
        <>
          <Typography>
            Another important aspect of password security is randomness and
            uniqueness. Passwords like &quot;happy&quot;, &quot;jackie&quot;,
            and &quot;asdfghjkl&quot; are commonly used and thus NOT secure.
          </Typography>
          <Typography>
            There are many lists available containing the most popularly used
            passwords, and hackers can easily try all the most common passwords
            when trying to break into accounts.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            {
              type: "sent",
              pos: "",
              contents: <>ok i’ve come up with a great password</>,
            },
            {
              type: "sent",
              pos: "",
              contents: (
                <>
                  it has a capital letter AND a number, and it isn’t super short
                </>
              ),
            },
            { type: "sent", pos: "last", contents: <>Password1</> },
            { type: "rec", pos: "", contents: <>...</> },
            { type: "rec", pos: "", contents: <>ok hold ur horses</> },
            {
              type: "rec",
              pos: "last",
              contents: <>also why did you text it to me??</>,
            },
            { type: "sent", pos: "", contents: <>uh...</> },
            { type: "sent", pos: "last", contents: <>hehe oops</> },
          ]}
        />
      ),
    },
    {
      slide: (
        <>
          <Typography>
            We have a list of the top 10,000 most commonly used passwords. Try
            submitting different passwords (of 4 or more characters) and we’ll
            check if they’re in the list or not.
          </Typography>
          <Typography>
            Not sure what to submit? Try foods, animals, hobbies, numbers, your
            name, etc.
          </Typography>
        </>
      ),
      phoneContent: () => <CommonPassword />,
    },
    {
      slide: (
        <>
          <Typography>
            It’s a good sign if your password isn’t in the list, but it still
            may not be secure. There are much longer lists on the internet
            containing millions of common passwords that hackers can use to
            break into accounts.
          </Typography>
          <Typography className="takeaway" style={{ marginBottom: "10px" }}>
            It’s crucial to make unique passwords that other people wouldn’t
            think of. You should also use different passwords for each of your
            accounts. Otherwise, one account getting hacked would mean that{" "}
            <em>all</em> of your accounts are hacked.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            {
              type: "sent",
              pos: "",
              contents: (
                <>
                  i guess i should be careful to make my passwords more
                  unique...
                </>
              ),
            },
            {
              type: "sent",
              pos: "last",
              contents: <>apparently Password1 is pretty commonly used</>,
            },
            { type: "rec", pos: "", contents: <>yeah</> },
            {
              type: "rec",
              pos: "",
              contents: <>also, a little piece of advice...</>,
            },
            {
              type: "rec",
              pos: "last",
              contents: <>don’t tell people your passwords!!!!</>,
            },
            {
              type: "sent",
              pos: "last",
              contents: <>i would never do such a thing :)</>,
            },
            { type: "rec", pos: "last", contents: <>...</> },
          ]}
        />
      ),
    },
  ],
  [
    {
      title: <>Lesson 4: Social Engineering</>,
      slide: (
        <>
          <Typography>
            In this lesson, we’ll learn about social engineering. Social
            engineering can take on many forms, one of which is digging into
            someone’s personal information to gain access to their accounts.
          </Typography>
          <Typography>
            Note: This demonstration is for educational purposes only. We do not
            condone hacking into other people’s accounts.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            { type: "rec", pos: "last", contents: <>hey, how ya doin?</> },
            { type: "sent", pos: "last", contents: <>i’m good, what’s up?</> },
            {
              type: "rec",
              pos: "",
              contents: (
                <>
                  i’m trying to convince my friend jason that security is
                  important
                </>
              ),
            },
            {
              type: "rec",
              pos: "last",
              contents: <>can you try to break into his account for me?</>,
            },
            { type: "sent", pos: "", contents: <>idk much about hacking...</> },
            {
              type: "sent",
              pos: "last",
              contents: <>i guess i can try though</>,
            },
          ]}
        />
      ),
    },
    {
      slide: (
        <>
          <Typography>
            We want to hack into Jason’s account. Suppose Hackerman already gave
            us Jason’s username and password, but we need to answer some
            security questions!
          </Typography>
          <Typography>
            Luckily, we have access to his Instagram posts, so let’s see if we
            can social engineer the answers by doing a little research! Try
            looking through Jason’s Instagram posts to answer the security
            questions for his account.
          </Typography>
        </>
      ),
      input: true,
      slideAdd: (count, setCount) => {
        return <Browser count={count} setCount={setCount} />
      },
      topContent: true,
      phoneContent: () => <Profile />,
    },
    {
      slide: (
        <>
          <Typography>
            As you can see, social engineering is quite a powerful tool! In this
            case, Jason made the mistake of using security questions that anyone
            with access to his Instagram could answer.
          </Typography>
          <Typography>
            However, hackers can socially engineer information in other ways.
            For example, they can use fraudulent phone calls, emails, or texts
            impersonating someone you trust (like your bank or maybe a
            co-worker).
          </Typography>
          <Typography className="takeaway" style={{ marginBottom: "10px" }}>
            Always be cautious with your online security, and be especially wary
            when providing someone with your private credentials or information.
          </Typography>
        </>
      ),
      topContent: true,
      phoneContent: () => (
        <Chat
          key={getChatKey()}
          messages={[
            { type: "sent", pos: "last", contents: <>i’m in, hackerman</> },
            { type: "rec", pos: "", contents: <>ayyy</> },
            { type: "rec", pos: "last", contents: <>how was it?</> },
            { type: "sent", pos: "", contents: <>not too bad tbh</> },
            {
              type: "sent",
              pos: "last",
              contents: <>all the info was posted on his instagram lol</>,
            },
            { type: "rec", pos: "", contents: <>awesome, thanks!</> },
            {
              type: "rec",
              pos: "last",
              contents: <>hopefully this gives him a wake-up call</>,
            },
          ]}
        />
      ),
    },
  ],
]
