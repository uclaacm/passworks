import React from 'react';

import TextSlide from '../TextSlide/TextSlide.js';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function Main() {
	const [count, setCount] = React.useState(0);

	const [lessonNum, setLessonNum] = React.useState(0);

  const lessonTexts = [
    [
			<Typography>Hello, world!</Typography>,
			<Typography>This is a passworks lesson</Typography>,
			<Typography>We're gonna learn so much :)</Typography>
		],
		[
			<Typography>Goodbye, world!</Typography>,
		  <Typography>You finished our passworks lesson!</Typography>,
			<Typography>We hope you had fun :)</Typography>
		]
  ];
	
	return(
		<>
			<Grid 
				container
				direction='column'
				justify='center'
				alignItems='center'
			>
				<TextSlide 
					count={count}
					lessonItems={lessonTexts[lessonNum]}
				/>
				{
					(count === lessonTexts[lessonNum].length - 1) ?
					(lessonNum === lessonTexts.length - 1) ? null : 
					<Button onClick={() => { setLessonNum(lessonNum + 1); setCount(0); }}>
						Next Lesson
					</Button> :
					<Button onClick={() => setCount(count + 1)}>
						Next
					</Button>
				}
			</Grid>
		</>
	);
}

export default Main;