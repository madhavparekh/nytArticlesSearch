import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import RenderMoment from '../components/RenderMoment';

class TwitterMoment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moments: [],
		};
	}

	componentDidMount = async () => {
		var res = await fetch('/moments', {
			method: 'GET',
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			this.setState({
				moments: res,
			});
		}
	};

	render() {
		return (
			<Aux>
				{this.state.moments.map((item, indx) => {
					return <RenderMoment key={indx} item={item} />;
				})}
			</Aux>
		);
	}
}

export default TwitterMoment;
