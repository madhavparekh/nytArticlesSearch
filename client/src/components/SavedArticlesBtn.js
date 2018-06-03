import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Aux from '../hoc/Auxilary';

class SavedArticles extends Component {
	handleBtnClick = async (e) => {
		e.preventDefault();
		this.props.savedHandler(true);
	};

	render() {
		return (
			<Aux>
				<Button className="m-2" color="primary" onClick={this.handleBtnClick}>
					Saved Articles
				</Button>
			</Aux>
		);
	}
}

export default SavedArticles;
