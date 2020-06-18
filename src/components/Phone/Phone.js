import React from 'react';

export default function Phone(props) {
	return (
		<div className="main-container">
			<div className="phone-bezel">
				<div className="phone-screen">
					<div className="phone-cutout"></div>
					<div className="phone-content">
						{props.content}
					</div>
				</div>
			</div>
		</div>
	);
}
