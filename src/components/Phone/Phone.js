import React from 'react';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
	noBar: {
		'&::-webkit-scrollbar': {
			width: '0em'
		},
		'scrollbar-width': 'none'
	}
});

export default function Phone(props) {
	const classes = useStyles();

	return (
		<div class="phone-bezel">
			<div class="phone-screen">
				<div class="phone-cutout"></div>
				<div class="phone-content">
						<List className={classes.noBar} style={{maxHeight: '100%', overflow: 'auto'}} >
							{props.content}
						</List>
				</div>
			</div>
		</div>
	);
}
