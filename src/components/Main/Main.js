import React from 'react';
import Button from '@material-ui/core/Button';
import LessonText from '../LessonText/LessonText.js';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';

import { allLessons } from '../../constants/lessons.js';
import Phone from '../Phone/Phone.js';
import Profile from '../Profile/Profile.js';

const useStyles = theme => ({
	lessonName: {
		color: theme.palette.primary.main,
		textAlign: 'center',
		padding: '20px 0px'
	},
	inputText: {
		margin: '4px', 
		padding: '8px',
		borderRadius: '4px',
		fontFamily: '"Chivo"',
		fontSize: '1em'
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

	renderInputForm = classes => {
		if (allLessons[this.state.lessonNum][this.state.count].input) {
			return (
				<>
					<form onSubmit={this.handleInputSubmit}>
						<input type='text' className={classes.inputText}
							value={this.state.value} onChange={this.handleInputChange} />
						<Button disableRipple variant='outlined' type='submit'>Submit</Button>
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
		const phoneContent = allLessons[this.state.lessonNum][this.state.count].phoneContent;
		const userInput = this.state.userInput;
		const inputType = allLessons[this.state.lessonNum][this.state.count].inputType;
		const inputLength = this.state.inputLength;

		return (
			<Container maxWidth='lg'>
				{this.renderLessonName(classes)}
				<Grid 
					container
					spacing={3}
					alignItems='center'
					justify='center'
				>
					<Grid item sm={12} md={5}>
						<div className="main-container">
							<Phone content={phoneContent === null ? null : phoneContent(userInput, inputType, inputLength)} />
						</div>
					</Grid>
					<Grid item sm={12} md={5}>
						<Box display='flex' flexDirection='column' alignItems='center'>
							{this.renderInputForm(classes)}
							{this.renderLessonText()}
						</Box>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Main);