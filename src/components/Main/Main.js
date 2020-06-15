import React from 'react';

import { Button } from '@material-ui/core';
import { allLessons } from '../../constants/lessons.js';
import LessonText from '../LessonText/LessonText.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = theme => ({
	lessonName: {
		color: theme.palette.primary.main
	}
})

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			lessonNum: 0,
      value: '',
			userInput: '',
			inputLength: 0,
			inputError: false,
			errorString: ''
		};
	}

  handleInputChange = event => {
    this.setState({value: event.target.value, inputLength: event.target.value.length});
  }

  handleInputSubmit = event => {
		event.preventDefault();
		
		const inputDesc = allLessons[this.state.lessonNum][this.state.count].inputDesc;
		const expectedLength = allLessons[this.state.lessonNum][this.state.count].inputLength;
		const checkInput = allLessons[this.state.lessonNum][this.state.count].checkInput;
		
		let newError;
		let inputValid = true;

		if (this.state.value.length !== expectedLength && expectedLength !== -1) {
			inputValid = false;
		}
		if (!checkInput(this.state.value)) {
			inputValid = false;
		}

		if (!inputValid) {
			newError = `Please enter ${inputDesc}.`;
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

	renderLessonName = classes => {
		return (
			<Typography variant='h4' className={classes.lessonName}>
				{allLessons[this.state.lessonNum][0].title}
			</Typography>
		);
	}

	renderInputForm = () => {
		if (allLessons[this.state.lessonNum][this.state.count].input) {
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
					<Typography color='error'>{this.state.inputError ? this.state.errorString : null}</Typography>
				</>
			);
		}
	}

	renderLessonText = () => {
		return (
			<LessonText
				count={this.state.count}
				lessonNum={this.state.lessonNum}
				userInput={this.state.userInput}
				inputLength={this.state.inputLength}
				setCount={this.setCount}
				setLessonNum={this.setLessonNum}
			/>
		);
	}

	render() {
		const { classes } = this.props;
		return (
			<Grid 
				container
				direction='column'
				justify='center'
				alignItems='center'
			>
				{this.renderLessonName(classes)}
				{this.renderInputForm(classes)}
				{this.renderLessonText()}
			</Grid>
		);
	}
}

export default withStyles(useStyles)(Main);