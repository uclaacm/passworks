import React from 'react';
import LessonText from '../LessonText/LessonText.js';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import { allLessons } from '../../constants/lessons.js';
import Phone from '../Phone/Phone.js';

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
	},
	arrowIcon: {
		color: theme.palette.secondary.main
	},
	selectedLesson: {
		color: 'black',
		borderColor: 'black',
		'&:hover': {
			borderColor: theme.palette.secondary.main
		}
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
			this.setState({ userInput: this.state.value, inputLength: this.state.value.length, 
				value: '', inputError: false });
    	this.setCount(this.state.count + 1);
		}
	}

	setCount = newCount => {
		this.setState({ count: newCount, errorString: '', inputError: false });
	}

	setLessonNum = newLessonNum => {
		this.setState({lessonNum: newLessonNum});
	}

	setLessonAndCount = (newLessonNum, newCount) => {
		this.setLessonNum(newLessonNum);
		this.setCount(newCount);
		if ('defaultInput' in allLessons[newLessonNum][newCount]) {
			this.setState({ value: allLessons[newLessonNum][newCount].defaultInput() });
		}
	}

	renderLessonName = classes => {
		return (
			<Typography variant='h4' className={classes.lessonName}>
				{allLessons[this.state.lessonNum][0].title}
			</Typography>
		);
	}

	renderLessonText = () => {
		return (
			<LessonText
				count={this.state.count}
				lessonNum={this.state.lessonNum}
				setLessonAndCount={this.setLessonAndCount}
			/>
		);
	}

	renderNavBar = classes => {
		const lessonButtons = allLessons.map((lesson, i) => {
			return (
				<>
					<Button variant='outlined' size='small' 
						className={i === this.state.lessonNum ? classes.selectedLesson : null}
						disabled={i === this.state.lessonNum ? true : false}
						onClick={() => {
							this.setLessonNum(i); 
							this.setCount(0); 
							this.setState({ userInput: '', value: '', inputLength: 0 })}}>
							{lesson[0].title}
					</Button>
					{i === allLessons.length - 1 ? null : <TrendingFlatIcon className={classes.arrowIcon}/>}
				</>
			);
		});

		return (
			<Box display='flex' direction='row' alignItems='center' style={{ paddingTop: 20 }}>
				{lessonButtons}
			</Box>
		);
	}

	render() {
		const { classes } = this.props;
		const userInput = this.state.userInput;
		const inputType = allLessons[this.state.lessonNum][this.state.count].inputType;
		const inputLength = this.state.inputLength;

		let phoneContent;
		const renderPhoneContent = allLessons[this.state.lessonNum][this.state.count].phoneContent;
		if (renderPhoneContent === null) {
			phoneContent = null;
		} else if (allLessons[this.state.lessonNum][this.state.count].input) {
			phoneContent = renderPhoneContent(
				classes, 
				this.state.value, 
				this.handleInputChange, 
				this.handleInputSubmit,
				this.state.inputError,
				this.state.errorString
			);
		} else {
			phoneContent = renderPhoneContent(userInput, inputType, inputLength);
		}

		return (
			<Container maxWidth='lg'>
				<Box display='flex' flexDirection='column' alignItems='center'>
					{this.renderLessonName(classes)}
					<Grid 
						container
						spacing={3}
						alignItems='center'
						justify='center'
					>
						<Grid item sm={12} md={5}>
								<Box>
								<div className="main-container">
									<Phone content={phoneContent}/>
								</div>
							</Box>
						</Grid>
						<Grid item sm={8} md={5}>
							{this.renderLessonText()}
						</Grid>
					</Grid>
					{this.renderNavBar(classes)}
				</Box>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Main);