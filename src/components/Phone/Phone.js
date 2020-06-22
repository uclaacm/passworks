import React from 'react';

export default function Phone(props) {
	return (
		<div className="main-container">
			<div className="phone-bezel">
				<div className="phone-screen">
					<div className="phone-cutout"></div>
					{props.topContent ? (
						<div className="phone-content-top">
						{props.content}
						</div> ) : (
							<div className="phone-content">
								{props.content}
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
}
