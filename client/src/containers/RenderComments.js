import React, { Component } from 'react';
import { Button, Alert, Form, Input } from 'reactstrap';

class RenderComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			comments: [],
			visible: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.loadComments = this.loadComments.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	handleChange(event) {
		this.setState({ comment: event.target.value });
	}

	loadComments = async () => {
		var res = await fetch(`/latest/saved/comments/${this.props.item._id}`, {
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
		var res = await fetch(`/latest/saved/comment/${this.props.item._id}`, {
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

	onDismiss = ()=>{

		this.setState({visible: false})
		
	}



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
				<div className='my-1'>
          <p>Comments</p>
					{this.state.comments &&
						this.state.comments.map((e) => {
							return <Alert color='secondary' className='p-1 py-0 my-1'>{e.body}</Alert>
						})}
				</div>
			</div>
		);
	}
}

export default RenderComments;
