import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Aux from '../hoc/Auxilary';

class Scrape extends Component {
	handleBtnClick = async (e) => {
		e.preventDefault();
		var res = await fetch('/scrape', {
			method: 'GET',
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			this.props.btnClicked();
		}
	};

	render() {
		return (
			<Aux>
				<p className="lead">
					<Button color="primary" onClick={this.handleBtnClick}>
						Scrape Recent
					</Button>
				</p>
			</Aux>
		);
	}
}

export default Scrape;
