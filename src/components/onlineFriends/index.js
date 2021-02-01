import React from 'react';

const OnlineFriends = ({online}) => {
	if(!online) {
		return false
	}
	return (
		<div className="px-4 pb-4">
			<div className="owl-carousel">
				<div className="owl-stage-outer">
					<ul className="owl-stage d-flex list-unstyled">
						<li className="owl-item friends__item text-center">
							<div className="friends__image rounded-circle mx-auto"></div>
							<div className="friends__name">
								friend
							</div>
						</li>
						<li className="owl-item friends__item text-center">
							<div className="friends__image rounded-circle mx-auto"></div>
							<div className="friends__name">
								friend
							</div>
						</li>
						<li className="owl-item friends__item text-center">
							<div className="friends__image rounded-circle mx-auto"></div>
							<div className="friends__name">
								friend
							</div>
						</li>

					</ul>
				</div>
			</div>
		</div>
	)
}
export default OnlineFriends