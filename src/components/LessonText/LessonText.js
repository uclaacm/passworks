import React from 'react';
import TextSlide from '../TextSlide/TextSlide.js';
import { allLessons } from '../../constants/lessons';
import { Button, ButtonGroup } from '@material-ui/core';

class LessonText extends React.Component {
  renderButtons = () => {
		const isFirstLesson = this.props.lessonNum === 0;
		const isLastLesson  = this.props.lessonNum === allLessons.length - 1;
		const isFirstSlide  = this.props.count === 0;
		const isLastSlide   = this.props.count === allLessons[this.props.lessonNum].length - 1;
		const isInputSlide  = allLessons[this.props.lessonNum][this.props.count].input;

		const renderNextLesson = !isLastLesson && isLastSlide;
		const renderLastLesson = !isFirstLesson && isFirstSlide;
		const renderNext       = !isLastSlide && !isInputSlide;
		const renderBack       = !isFirstSlide;

		const nextLessonButton = (<Button variant='outlined' onClick={() => {
			this.props.setLessonNum(this.props.lessonNum + 1); this.props.setCount(0); }}> Next
			Lesson</Button>);
		const lastLessonButton = (<Button variant='outlined' onClick={() => {
			this.props.setLessonNum(this.props.lessonNum - 1); this.props.setCount(0); }}> Last
			Lesson</Button>);
		const nextButton = (<Button variant='outlined' onClick={() => {
			this.props.setCount(this.props.count + 1)}}>Next</Button>);
		const backButton = (<Button variant='outlined' onClick={() => {
			this.props.setCount(this.props.count - 1); }}>Back</Button>);

		return (
			<ButtonGroup>
				{renderLastLesson && lastLessonButton}
				{renderBack && backButton}
				{renderNext && nextButton}
				{renderNextLesson && nextLessonButton}
			</ButtonGroup>
		);
	}

  render () {
    const lessonSlides = allLessons[this.props.lessonNum];
    const lessonItems = lessonSlides.map(item => {
      return (item.slide);
    });
    
    return (
      <>
        <TextSlide 
          count={this.props.count}
          lessonItems={lessonItems}
          lessonSlides={lessonSlides}
          usesInput={lessonSlides[this.props.count].usesInput}
          userInput={this.props.userInput}
          inputLength={this.props.inputLength}
          inputType={lessonSlides[this.props.count].inputType}
        />
        {this.renderButtons()}
      </>
    );
  }
}

export default LessonText;
