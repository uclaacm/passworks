import React from 'react';
import TextSlide from '../TextSlide/TextSlide.js';
import { allLessons } from '../../constants/lessons';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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

		const nextLessonButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setLessonNum(this.props.lessonNum + 1); this.props.setCount(0); }}> Next
			Lesson</Button>);
		const lastLessonButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setLessonNum(this.props.lessonNum - 1); 
			this.props.setCount(allLessons[this.props.lessonNum - 1].length - 1); 
		}}> Back
		</Button>);
		const nextButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setCount(this.props.count + 1)}}>Next</Button>);
		const backButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setCount(this.props.count - 1); }}>Back</Button>);

		return (
			<Box>
				{renderLastLesson && lastLessonButton}
				{renderBack && backButton}
				{renderNext && nextButton}
				{renderNextLesson && nextLessonButton}
			</Box>
		);
	}

  render () {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <TextSlide 
          count={this.props.count}
          lessonItems={this.props.lessonItems}
        />
        {this.renderButtons()}
      </Box>
    );
  }
}

export default LessonText;
