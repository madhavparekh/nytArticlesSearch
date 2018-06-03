import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Aux from '../hoc/Auxilary';

class SavedArticlesBtn extends Component {
	handleBtnClick = async (e) => {
		e.preventDefault();
		this.setState({
			btnClicked: true,
		});
		this.props.savedHandler(true);
	};

	render() {
		return (
			<Aux>
				<Button
					className="m-2"
					color="primary"
					disabled={this.props.disableBtn}
					onClick={this.handleBtnClick}
				>
					Saved Articles
				</Button>
			</Aux>
		);
	}
}

export default SavedArticlesBtn;
