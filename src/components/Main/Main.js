import React from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat"
import LessonText from "../LessonText/LessonText"

import allLessons from "../../constants/lessons"
import Phone from "../Phone/Phone"

const useStyles = (theme) => ({
  lessonName: {
    color: theme.palette.primary.main,
    textAlign: "center",
    padding: "10px 0px 20px",
  },
  inputText: {
    margin: "4px",
    padding: "8px",
    borderRadius: "4px",
    fontFamily: '"Chivo"',
    fontSize: "1em",
  },
  arrowIcon: {
    color: theme.palette.secondary.main,
  },
  selectedLesson: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  mainContainer: {
    paddingTop: 70,
  },
})

function LessonNavButton(props) {
  const history = useHistory()
  const { classes, i, lesson, lessonNum } = props
  return (
    <>
      <Button
        variant="outlined"
        disableRipple
        className={i === lessonNum ? classes.selectedLesson : null}
        onClick={() => {
          history.push(`/activity/${props.i + 1}`)
        }}
      >
        {lesson[0].title}
      </Button>
      {i === allLessons.length - 1 ? null : (
        <TrendingFlatIcon className={classes.arrowIcon} />
      )}
    </>
  )
}

LessonNavButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  i: PropTypes.objectOf(PropTypes.number).isRequired,
  lesson: PropTypes.objectOf(PropTypes.any).isRequired,
  lessonNum: PropTypes.objectOf(PropTypes.number).isRequired,
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      lessonNum: props.lessonNum,
      value: "",
      userInput1: "",
      userInput2: "",
      inputLength: 0,
      inputError: false,
      errorString: "",
    }
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value,
      inputLength: event.target.value.length,
    })
  }

  handleInputSubmit = (event) => {
    event.preventDefault()
    const { lessonNum, count, value } = this.state

    const { inputDesc, checkInput, inputNum } = allLessons[lessonNum][count]
    const inputNumber = inputNum === 2 ? 2 : 1

    let newError
    let inputValid = true

    if (!checkInput(value)) {
      inputValid = false
    }

    if (!inputValid) {
      newError = `Please enter ${inputDesc}.`
      this.setState({ value: "", errorString: newError, inputError: true })
    } else {
      if (inputNumber === 2) {
        this.setState({ userInput2: value })
      } else {
        this.setState({ userInput1: value })
      }
      this.setState({
        inputLength: value.length,
        value: "",
        inputError: false,
      })
      this.setCount(count + 1)
    }
  }

  setCount = (newCount) => {
    this.setState({
      count: newCount,
      errorString: "",
      value: "",
      inputError: false,
    })
  }

  renderLessonName = (classes) => {
    const { lessonNum } = this.state

    return (
      <Typography variant="h4" className={classes.lessonName}>
        {allLessons[lessonNum][0].title}
      </Typography>
    )
  }

  renderLessonText = () => {
    const { lessonNum, count } = this.state

    const lessonSlides = allLessons[lessonNum]
    const lessonItems = lessonSlides.map((item) => {
      let extraContent
      if (!("slideAdd" in item)) {
        extraContent = null
      } else {
        extraContent = item.slideAdd(count, this.setCount)
      }
      return (
        <>
          {item.slide}
          {extraContent}
        </>
      )
    })

    return (
      <LessonText
        count={count}
        lessonNum={lessonNum}
        setCount={this.setCount}
        lessonItems={lessonItems}
      />
    )
  }

  renderNavBar = (classes) => {
    const { lessonNum } = this.state

    const lessonButtons = allLessons.map((lesson, i) => (
      <LessonNavButton
        classes={classes}
        i={i}
        lesson={lesson}
        lessonNum={lessonNum}
      />
    ))

    return (
      <Box
        display="flex"
        direction="row"
        alignItems="center"
        style={{ paddingTop: 20 }}
      >
        {lessonButtons}
      </Box>
    )
  }

  render() {
    const { lessonNum, count, value, inputError, errorString } = this.state
    const { classes } = this.props
    const { userInput1, userInput2, inputLength } = this.state
    const { inputType, usesInput2 } = allLessons[lessonNum][count]

    let phoneContent
    const renderPhoneContent = allLessons[lessonNum][count].phoneContent
    if (renderPhoneContent === null) {
      phoneContent = null
    } else if (allLessons[lessonNum][count].input) {
      // render randomize button
      let randomButton
      if ("defaultInput" in allLessons[lessonNum][count]) {
        randomButton = (
          <Button
            disableRipple
            variant="contained"
            disableElevation
            onClick={() =>
              this.setState({
                value: allLessons[lessonNum][count].defaultInput(),
              })
            }
          >
            Randomize
          </Button>
        )
      } else {
        randomButton = null
      }
      // render input form
      phoneContent = renderPhoneContent(
        classes,
        value,
        this.handleInputChange,
        this.handleInputSubmit,
        inputError,
        errorString,
        randomButton
      )
    } else if (allLessons[lessonNum][count].comparison) {
      // render math comparison
      phoneContent = renderPhoneContent(inputLength)
    } else if (allLessons[lessonNum][count].timeDifference) {
      // time difference
      phoneContent = renderPhoneContent(userInput1, userInput2)
    } else {
      // chat, profile, commonpassword, or guesser
      const userInput = usesInput2 ? userInput2 : userInput1
      phoneContent = renderPhoneContent(userInput, inputType)
    }

    return (
      <Container maxWidth="lg">
        <Box className={classes.mainContainer}>
          {this.renderNavBar(classes)}
          {this.renderLessonName(classes)}
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item sm={12} md={5}>
              <Phone
                content={phoneContent}
                topContent={allLessons[lessonNum][count].topContent}
              />
            </Grid>
            <Grid item sm={8} md={5}>
              {this.renderLessonText()}
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  lessonNum: PropTypes.objectOf(PropTypes.number),
}

Main.defaultProps = {
  lessonNum: 0,
}

export default withStyles(useStyles)(Main)
