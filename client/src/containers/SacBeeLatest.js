import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import RenderLatest from '../components/RenderLatest';

class SacBeeLatest extends Component {
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
					return <RenderLatest key={indx} item={item} />;
				})}
			</Aux>
		);
	}
}

export default SacBeeLatest;
