import React from 'react';
import TextSlide from '../TextSlide/TextSlide.js';
import { allLessons } from '../../constants/lessons';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class LessonText extends React.Component {
  renderButtons = () => {
		const isLastLesson  = this.props.lessonNum === allLessons.length - 1;
		const isLastSlide   = this.props.count === allLessons[this.props.lessonNum].length - 1;
		const isInputSlide  = allLessons[this.props.lessonNum][this.props.count].input;
		const usesInput  = allLessons[this.props.lessonNum][this.props.count].usesInput;

		const renderNextLesson = !isLastLesson && isLastSlide;
		const renderNext       = !isLastSlide && !isInputSlide;
		const renderBack       = usesInput;
		const renderEnd				 = isLastLesson && isLastSlide;

		const nextLessonButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setLessonAndCount(this.props.lessonNum + 1, 0); }}> Next
			Lesson</Button>);
		const nextButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setCount(this.props.count + 1)}}>
				Next
			</Button>);
		const backButton = (<Button disableRipple variant='outlined' onClick={() => {
			this.props.setLessonAndCount(this.props.lessonNum, this.props.count - 1); }}>Back</Button>);
		const endButton = (<Button disableRipple variant='contained' href='#EndSection'>Continue</Button>);

		return (
			<Box>
				{renderBack && backButton}
				{renderNext && nextButton}
				{renderNextLesson && nextLessonButton}
				{renderEnd && endButton}
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
