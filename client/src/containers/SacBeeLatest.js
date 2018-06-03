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

	loadData = async () => {
		var res = await fetch('/latest/', {
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

	componentDidMount() {
		this.loadData(this.props.personId);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.update !== nextProps.update) {
			this.loadData(nextProps.personId);
		}
	}

	render() {
		return (
			<Aux>
				{this.state.moments &&
					this.state.moments.map((item, indx) => {
						return <RenderLatest key={indx} item={item} reloadData={this.loadData}/>;
					})}
			</Aux>
		);
	}
}

export default SacBeeLatest;
