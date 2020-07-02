import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import TextSlide from "./TextSlide/TextSlide"
import allLessons from "../../constants/lessons"

class LessonText extends React.Component {
  renderButtons = () => {
    const { lessonNum, count, setLessonAndCount, setCount } = this.props

    const isLastLesson = lessonNum === allLessons.length - 1
    const isLastSlide = count === allLessons[lessonNum].length - 1
    const isInputSlide = allLessons[lessonNum][count].input
    const isFirstSlide = count === 0

    const renderNextLesson = !isLastLesson && isLastSlide
    const renderNext = !isLastSlide && !isInputSlide
    const renderBack = !isFirstSlide
    const renderEnd = isLastLesson && isLastSlide

    const nextLessonButton = (
      <Button
        disableRipple
        variant="outlined"
        onClick={() => {
          setLessonAndCount(lessonNum + 1, 0)
        }}
      >
        {" "}
        Next Lesson
      </Button>
    )
    const nextButton = (
      <Button
        disableRipple
        variant="outlined"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Next
      </Button>
    )
    const backButton = (
      <Button
        disableRipple
        variant="outlined"
        onClick={() => {
          setCount(count - 1)
        }}
      >
        Back
      </Button>
    )
    const endButton = (
      <Button disableRipple variant="contained" href="#EndSection">
        Continue
      </Button>
    )

    return (
      <Box>
        {renderBack && backButton}
        {renderNext && nextButton}
        {renderNextLesson && nextLessonButton}
        {renderEnd && endButton}
      </Box>
    )
  }

  render() {
    const { lessonItems, count } = this.props

    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextSlide count={count} lessonItems={lessonItems} />
        {this.renderButtons()}
      </Box>
    )
  }
}

LessonText.propTypes = {
  lessonNum: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setLessonAndCount: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  lessonItems: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default LessonText
