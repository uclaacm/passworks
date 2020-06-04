import React from 'react';


import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Lesson from '../Lesson/Lesson.js';

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

	render() {
		const lessonSlides = [
			[
				{ 
					slide: <Typography>Why are long passwords more secure than short ones?
						Try submitting a 4-digit password!
						</Typography>,
					input: true,
					inputType: 'num',
					inputLength: 4
				},
				{
					slide: <Typography>Let's see how long it takes for a computer to
						guess your 4-digit password!
						</Typography>
				},
				{
					slide: <Typography>Wow, that was really fast! Now let's try using
						a 6-digit password!
						</Typography>,
					input: true,
					inputType: 'num',
					inputLength: 6
				},
				{ 
					slide: <Typography>Let's see how long it takes for the computer
						to guess your 6-digit password!
					</Typography>
				}
			],
			[
				{ slide: <Typography>Goodbye, world!</Typography>},
				{ slide: <Typography>You finished our passworks lesson!</Typography>},
				{ slide: <Typography>We hope you had fun :)</Typography>}
			]
		];
		
		return(
			<>
				{(lessonSlides[this.state.lessonNum][this.state.count].input) ? 
            <form onSubmit={this.handleInputSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleInputChange} />
            </form>
            : null
        }
				<Lesson
					count={this.state.count}
					setCount={this.setCount}
					lessonSlides={lessonSlides[this.state.lessonNum]}
					/>
				{
					(this.state.count === lessonSlides[this.state.lessonNum].length - 1) ?
					(this.state.lessonNum === lessonSlides.length - 1) ? null : 
						<Button onClick={() => { this.setLessonNum(this.state.lessonNum + 1); this.setCount(0); }}>
							Next Lesson
						</Button> :
							lessonSlides[this.state.lessonNum][this.state.count].input ? null :
							<Button onClick={() => this.setCount(this.state.count + 1)}>
								Next
							</Button>
				}
			</>
		);
	}
}

export default Main;