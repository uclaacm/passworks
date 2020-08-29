import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const securityQuestions = [
  {
    q: "Where did you grow up?",
    match: (str) => str === "san francisco",
    hint: "Hint: Try checking the locations of Caitlin’s instagram posts",
  },
  {
    q: "What is your favorite animal?",
    match: (str) => /^cats?$/.test(str),
    hint: "Hint: Look at Caitlin’s username",
  },
  {
    q: "What was the name of your first pet?",
    match: (str) => str === "mufasa",
    hint: "Hint: Read the captions of Caitlin’s posts more carefully",
  },
]

const useStyles = () => ({
  inputText: {
    margin: "4px",
    padding: "8px",
    borderRadius: "4px",
    fontFamily: '"Chivo"',
    fontSize: "1em",
  },
})

class Browser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: "",
      questionNum: 0,
      attempts: 0,
      inputError: false,
      errorString: `Sorry, that’s incorrect. Please try again.`,
    }
  }

  handleInputChange = (event) => {
    this.setState({ answer: event.target.value })
  }

  handleInputSubmit = (event) => {
    const { questionNum, answer, attempts } = this.state

    event.preventDefault()
    if (securityQuestions[questionNum].match(answer.toLowerCase())) {
      this.setState({
        answer: "",
        inputError: false,
        errorString: "Sorry, that’s incorrect. Please try again.",
        questionNum: questionNum + 1,
        attempts: 0,
      })
    } else {
      const updatedAttempts = attempts + 1
      this.setState({ answer: "", inputError: true, attempts: updatedAttempts })
      if (updatedAttempts > 2) {
        this.setState({
          inputError: true,
          errorString: securityQuestions[questionNum].hint,
        })
      }
    }
  }

  renderContent = (classes) => {
    const { questionNum, answer, inputError, errorString } = this.state
    const { setCount, count } = this.props

    return questionNum === securityQuestions.length ? (
      <Box display="flex" flexDirection="column" alignItems="center">
        <CheckCircleIcon
          style={{
            color: "green",
            fontSize: "4em",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Welcome, Caitlin!
        </Typography>
        <Button
          variant="contained"
          disableRipple
          disableElevation
          onClick={() => setCount(count + 1)}
        >
          Continue
        </Button>
      </Box>
    ) : (
      <>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {securityQuestions[questionNum].q}
        </Typography>
        <form onSubmit={this.handleInputSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <input
              type="text"
              className={classes.inputText}
              value={answer}
              onChange={this.handleInputChange}
            />
            <Typography color="error" style={{ textAlign: "center" }}>
              {inputError ? errorString : null}
            </Typography>
            <Button
              disableRipple
              variant="contained"
              disableElevation
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className="main-container">
        <div className="browser-container">
          <div className="browser-header">
            <div className="dot" id="red-dot" />
            <div className="dot" id="yellow-dot" />
            <div className="dot" id="green-dot" />
          </div>
          <div className="browser-content">{this.renderContent(classes)}</div>
        </div>
      </div>
    )
  }
}

Browser.propTypes = {
  setCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withStyles(useStyles)(Browser)
