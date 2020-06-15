import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

class Phone extends React.Component {
	/* just leaving these for filler */
	constructor(props) {
			super(props);
			this.state = {
					toptitle: this.props.toptitle,
					postimg: this.props.postimg,
					poster: this.props.poster,
					caption: this.props.caption
			}
	}

	render() {
		return (
			<div class="phone-bezel">
				<div class="phone-screen">
					<div class="phone-cutout"></div>
					<div class="phone-content">
							<List style={{maxHeight: '100%', overflow: 'auto'}} >
								{this.props.content}
							</List>
					</div>
				</div>
			</div>
		)
	}
}

export default Phone;