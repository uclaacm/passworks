import React from 'react';


import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { lessonSlides } from '../../constants/lessons.js';
import LessonText from '../LessonText/LessonText.js';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			lessonNum: 0,
      value: '',
			userInput: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputSubmit = this.handleInputSubmit.bind(this);
		this.setCount = this.setCount.bind(this);
		this.setLessonNum = this.setLessonNum.bind(this);
	}

  handleInputChange(event) {
    this.setState({value: event.target.value});
  }

  handleInputSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    this.setState({ userInput: this.state.value, value: '' });
    event.preventDefault();
    this.setCount(this.state.count + 1);
	}

	setCount = newCount => {
		this.setState({count: newCount});
	}

	setLessonNum = newLessonNum => {
		this.setState({lessonNum: newLessonNum});
	}

	renderInputForm = () => {
		return ((lessonSlides[this.state.lessonNum][this.state.count].input) ? 
		<form onSubmit={this.handleInputSubmit}>
			<input type="text" value={this.state.value} onChange={this.handleInputChange} />
		</form>
		: null);
	}

	renderLessonText = () => {
		return (
			<LessonText
					count={this.state.count}
					setCount={this.setCount}
					lessonSlides={lessonSlides[this.state.lessonNum]}
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
					<Button onClick={() => this.setCount(this.state.count + 1)}>
					Next
					</Button>
				);
			}
		}
		// (this.state.count === lessonSlides[this.state.lessonNum].length - 1) ?
		// (this.state.lessonNum === lessonSlides.length - 1) ? null : 
		// 	<Button onClick={() => { this.setLessonNum(this.state.lessonNum + 1); this.setCount(0); }}>
		// 		Next Lesson
		// 	</Button> :
		// 		lessonSlides[this.state.lessonNum][this.state.count].input ? null :
		// 		<Button onClick={() => this.setCount(this.state.count + 1)}>
		// 			Next
		// 		</Button>
	}

	render() {
		return(
			<>
				{this.renderInputForm()}
				{this.renderLessonText()}
				{this.renderNextButton()}
			</>
		);
	}
}

export default Main;