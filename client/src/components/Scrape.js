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
			
			this.props.savedHandler(false);
			this.props.btnClicked();
			
		}
	};

	render() {
		return (
			<Aux>
				<Button className='m-2' color="primary" onClick={this.handleBtnClick}>
					Scrape Recent
				</Button>
			</Aux>
		);
	}
}

export default Scrape;
