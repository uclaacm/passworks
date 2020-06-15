import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';
import { lessonSlides } from '../../constants/lessons.js';
import LessonText from '../LessonText/LessonText.js';
import Grid from '@material-ui/core/Grid';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			lessonNum: 0,
      value: '',
			userInput: '',
			inputError: false,
			errorString: ''
		};
	}

  handleInputChange = event => {
    this.setState({value: event.target.value});
  }

  handleInputSubmit = event => {
		event.preventDefault();
		
		const inputDesc = lessonSlides[this.state.lessonNum][this.state.count].inputDesc;
		const inputLength = lessonSlides[this.state.lessonNum][this.state.count].inputLength;
		const checkInput = lessonSlides[this.state.lessonNum][this.state.count].checkInput;
		
		let newError;
		let inputValid = true;

		if (this.state.value.length !== inputLength && inputLength !== -1) {
			inputValid = false;
		}
		if (!checkInput(this.state.value)) {
			inputValid = false;
		}

		if (!inputValid) {
			newError = `Please enter ${inputLength} ${inputDesc}.`;
			this.setState({ value: '', errorString: newError, inputError: true });
		} else {
			this.setState({ userInput: this.state.value, value: '', inputError: false });
    	this.setCount(this.state.count + 1);
		}
	}

	setCount = newCount => {
		this.setState({count: newCount});
	}

	setLessonNum = newLessonNum => {
		this.setState({lessonNum: newLessonNum});
	}

	renderInputForm = () => {
		if (lessonSlides[this.state.lessonNum][this.state.count].input) {
			return (
				<>
					<form onSubmit={this.handleInputSubmit}>
						<input type='text' 
							style={{
								margin: '4px', 
								padding: '8px', 
								borderRadius: '4px',
							}} 
							value={this.state.value} onChange={this.handleInputChange} />
						<Button variant='outlined' type='submit'>Submit</Button>
					</form>
					<div>{this.state.inputError ? this.state.errorString : null}</div>
				</>
			);
		}
	}

	renderLessonText = () => {
		return (
			<LessonText
				count={this.state.count}
				lessonSlides={lessonSlides[this.state.lessonNum]}
				userInput={this.state.userInput}
			/>
		);
	}

	renderButtons = classes => {
		const isFirstLesson = this.state.lessonNum === 0;
		const isLastLesson  = this.state.lessonNum === lessonSlides.length - 1;
		const isFirstSlide  = this.state.count === 0;
		const isLastSlide   = this.state.count === lessonSlides[this.state.lessonNum].length - 1;
		const isInputSlide  = lessonSlides[this.state.lessonNum][this.state.count].input;

		const renderNextLesson = !isLastLesson && isLastSlide;
		const renderLastLesson = !isFirstLesson && isFirstSlide;
		const renderNext       = !isLastSlide && !isInputSlide;
		const renderBack       = !isFirstSlide;

		const nextLessonButton = (<Button variant='outlined' onClick={() => {
			this.setLessonNum(this.state.lessonNum + 1); this.setCount(0); }}> Next
			Lesson</Button>);
		const lastLessonButton = (<Button variant='outlined' onClick={() => {
			this.setLessonNum(this.state.lessonNum - 1); this.setCount(0); }}> Next
			Lesson</Button>);
		const nextButton = (<Button variant='outlined' onClick={() => {
			this.setCount(this.state.count + 1)}}>Next</Button>);
		const backButton = (<Button variant='outlined' onClick={() => {
			this.setCount(this.state.count - 1); }}>Back</Button>);

		return (
			<ButtonGroup>
				{renderLastLesson && lastLessonButton}
				{renderBack && backButton}
				{renderNext && nextButton}
				{renderNextLesson && nextLessonButton}
			</ButtonGroup>
		);
	}

	render() {
		const classes = this.props;
		return (
			<Grid 
				container
				direction='column'
				justify='center'
				alignItems='center'
			>
				{this.renderInputForm()}
				{this.renderLessonText()}
				{this.renderButtons(classes)}
			</Grid>
		);
	}
}

export default Main;