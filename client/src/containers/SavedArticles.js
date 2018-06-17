import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import RenderSaved from './RenderSaved';

class SavedArticles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SavedArticles: [],
		};
	}

	loadData = async () => {
		var res = await fetch('/articles/saved/', {
			method: 'GET',
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			this.setState({
				SavedArticles: res,
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
				{this.state.SavedArticles &&
					this.state.SavedArticles.map((article, indx) => {
						return (
							<RenderSaved
								key={indx}
								article={article}
								reloadData={this.loadData}
							/>
						);
					})}
			</Aux>
		);
	}
}

export default SavedArticles;
