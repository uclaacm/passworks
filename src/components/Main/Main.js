import React from 'react';

import { Button } from '@material-ui/core';
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
						<input type="text" value={this.state.value} onChange={this.handleInputChange} />
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

	renderNextButton = () => {
		if (this.state.count === lessonSlides[this.state.lessonNum].length - 1) {
			if (this.state.lessonNum === lessonSlides.length - 1)
				return null;
			else {
				return (
					<Button onClick={() => { this.setLessonNum(this.state.lessonNum + 1); this.setCount(0); }}>
						Next Lesson
					</Button>
				);
			}
		}
		else {
			if (lessonSlides[this.state.lessonNum][this.state.count].input)
				return null;
			else {
				return (
					<Grid container
						direction='row'
						justify='center'
						alignItems='center'
					>
						{lessonSlides[this.state.lessonNum][this.state.count].usesInput ? (
							<Button onClick={() => this.setCount(this.state.count - 1)}>
								Try Again
							</Button>
						) : null}
						<Button onClick={() => this.setCount(this.state.count + 1)}>
						Next
						</Button>
					</Grid>
				);
			}
		}
	}

	render() {
		return(
			<Grid 
				container
				direction='column'
				justify='center'
				alignItems='center'
			>
				{this.renderInputForm()}
				{this.renderLessonText()}
				{this.renderNextButton()}
			</Grid>
		);
	}
}

export default Main;