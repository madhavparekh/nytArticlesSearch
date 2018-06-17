import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import RenderComment from './RenderComment';

class RenderComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			comments: [],
			visible: true,
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadComments = this.loadComments.bind(this);
	}

	handleChange(event) {
		this.setState({ comment: event.target.value });
	}

	loadComments = async () => {
		var res = await fetch(`/latest/saved/comments/${this.props.article._id}`, {
			method: 'GET',
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			this.setState({
				comments: res.comments,
			});
		}
	};

	componentDidMount() {
		this.loadComments();
	}

	onBtnClick = async (e) => {
		var res = await fetch(`/latest/saved/comment/${this.props.article._id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify({ body: this.state.comment }),
		});
		if (res.status === 401) {
			this.setState({ comment: '' });
		} else if (res.status === 200) {
			res = await res.json();
			this.setState({ comment: '' });
		}
		this.loadComments();
	};

	render() {
		return (
			<div>
				<Form>
					<Input
						type="text"
						name="comment"
						id="comment"
						value={this.state.comment}
						placeholder="Add Comment"
						onChange={this.handleChange}
					/>
				</Form>
				<Button className="sm my-1" onClick={this.onBtnClick}>
					Post
				</Button>
				<div className="my-1">
					<p>Comments</p>
					{this.state.comments &&
						this.state.comments.map((e) => {
							return (
								<RenderComment
									comment={e}
									reLoad={this.loadComments}
									id={this.props.article._id}
								/>
							);
						})}
				</div>
			</div>
		);
	}
}

export default RenderComments;
