import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import RenderSaved from './RenderSaved';

class SavedArticles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moments: [],
		};
	}

	loadData = async () => {
		var res = await fetch('/latest/saved/', {
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
		this.loadData();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.update !== nextProps.update) {
			this.loadData();
		}
	}

	render() {
		return (
			<Aux>
				{this.state.moments &&
					this.state.moments.map((item, indx) => {
						return (
							<RenderSaved key={indx} item={item} reloadData={this.loadData} />
						);
					})}
			</Aux>
		);
	}
}

export default SavedArticles;
