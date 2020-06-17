import React from 'react';

export default function Phone(props) {
	return (
		<div class="phone-bezel">
			<div class="phone-screen">
				<div class="phone-cutout"></div>
				<div class="phone-content">
					{props.content}
				</div>
			</div>
		</div>
	);
}
