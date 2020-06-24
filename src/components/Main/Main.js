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
		padding: '10px 0px 20px'
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
    this.setState({ value: event.target.value, inputLength: event.target.value.length });
  }

  handleInputSubmit = event => {
		event.preventDefault();
		
		const inputDesc = allLessons[this.state.lessonNum][this.state.count].inputDesc;
		const checkInput = allLessons[this.state.lessonNum][this.state.count].checkInput;
		
		let newError;
		let inputValid = true;

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
		this.setState({ count: newCount, errorString: '', value: '', inputError: false });
	}

	setLessonNum = newLessonNum => {
		this.setState({ 
			lessonNum: newLessonNum, 
			value: '', 
			userInput: '', 
			inputLength: 0,
			errorString: '', 
			inputError: false 
		});
	}

	setLessonAndCount = (newLessonNum, newCount) => {
		this.setLessonNum(newLessonNum);
		this.setCount(newCount);
	}

	renderLessonName = classes => {
		return (
			<Typography variant='h4' className={classes.lessonName}>
				{allLessons[this.state.lessonNum][0].title}
			</Typography>
		);
	}

	renderLessonText = () => {
    const lessonSlides = allLessons[this.state.lessonNum];
    const lessonItems = lessonSlides.map(item => {
			let extraContent;
			if (!('slideAdd' in item)) {
				extraContent = null;
			} else {
				extraContent = item.slideAdd(this.state.count, this.setCount);
			}
      return (
				<>
					{item.slide}
					{extraContent}
				</>
			);
    });
    
		return (
			<LessonText
				count={this.state.count}
				lessonNum={this.state.lessonNum}
				setCount={this.setCount}
				setLessonNum={this.setLessonNum}
				lessonItems={lessonItems}
				setLessonAndCount={this.setLessonAndCount}
			/>
		);
	}

	renderNavBar = classes => {
		const lessonButtons = allLessons.map((lesson, i) => {
			const noButton = i === 0 || i === allLessons.length - 1;
			return (
				noButton ? null : 
				<React.Fragment key={i}>
					<Button variant='outlined' disableRipple
						className={i === this.state.lessonNum ? classes.selectedLesson : null}
						disabled={i === this.state.lessonNum ? true : false}
						onClick={() => {
							this.setLessonAndCount(i, 0);
							this.setState({ userInput: '', value: '', inputLength: 0 })}}>
							{lesson[0].title}
					</Button>
					{i === allLessons.length - 2 ? null : <TrendingFlatIcon className={classes.arrowIcon}/>}
				</React.Fragment>
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
			let randomButton;
			if ('defaultInput' in allLessons[this.state.lessonNum][this.state.count]) {
				randomButton = (
					<Button
						disableRipple variant='contained' disableElevation
						onClick={() => this.setState({ value: allLessons[this.state.lessonNum][this.state.count].defaultInput() })}
					>
						Randomize
					</Button>);
			} else {
				randomButton = null;
			}
			phoneContent = renderPhoneContent(
				classes, 
				this.state.value, 
				this.handleInputChange, 
				this.handleInputSubmit,
				this.state.inputError,
				this.state.errorString,
				randomButton
			);
		} else if (allLessons[this.state.lessonNum][this.state.count].comparison) {
			phoneContent = renderPhoneContent(inputLength);
		} else {
			phoneContent = renderPhoneContent(userInput, inputType, inputLength);
		}

		return (
			<Container maxWidth='lg'>
				<Box display='flex' flexDirection='column' alignItems='center'>
					{this.renderNavBar(classes)}
					{this.renderLessonName(classes)}
					<Grid
						container
						spacing={3}
						alignItems='center'
						justify='center'
					>
						<Grid item sm={12} md={5}>
							<Phone content={phoneContent}
								topContent={allLessons[this.state.lessonNum][this.state.count].topContent}/>
						</Grid>
						<Grid item sm={8} md={5}>
							{this.renderLessonText()}
						</Grid>
					</Grid>
				</Box>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Main);