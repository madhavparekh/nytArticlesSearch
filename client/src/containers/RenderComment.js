import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class RenderComment extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onDismiss = async (e) => {
		var res = await fetch(`/saved/${this.props.id}/comment/${this.props.comment._id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'same-origin',
		});
		if (res.status === 200) {
			this.props.reLoad();
		}
	};

	render() {
		return (
			<Alert color="secondary" className="p-auto my-1" toggle={this.onDismiss}>
				{this.props.comment.body}
			</Alert>
		);
	}
}

export default RenderComment;
