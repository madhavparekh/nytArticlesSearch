import React, { Component } from 'react';
import {
	Button,
	ButtonGroup,
	Alert,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Label,
	Input,
} from 'reactstrap';
import Aux from '../hoc/Auxilary';

class RenderSaved extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			modal: false,
			isSaved: false,
		};
	}

	onBtnClick = async (e) => {
		this.props.item.isSaved = !this.props.item.isSaved;

		var res = await fetch(`/moments/save/${this.props.item._id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify(this.props.item),
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			this.props.reloadData();
		}
	};

	toggle() {
		this.setState({ modal: !this.state.modal });
	}

	render() {
		return (
			<Aux className="m-2">
				<Alert
					color="primary"
					onClick={this.toggle}
					style={{ marginBottom: '1rem' }}
				>
					<h5>{this.props.item.title}</h5>
				</Alert>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>
						{this.props.item.title}
					</ModalHeader>
					<ModalBody>
						<div>{this.props.item.description}</div>
						<hr />
						<div>
							<Form>
									<Label for="Comment">Comment</Label>
									<Input
										type="text"
										name="comment"
										id="comment"
										placeholder="Add Comment"
									/>
							</Form>
							<Button className='sm my-1'>Post</Button>
						</div>
					</ModalBody>
					<ModalFooter>
						<div className="row">
							<ButtonGroup className="col-sm-12">
								<Button
									color="secondary"
									className="mx-1"
									href={this.props.item.link}
									target="_blank"
								>
									Article Link
								</Button>
								<Button
									color="secondary"
									className="mx-1"
									href={this.props.item.img}
									target="_blank"
								>
									Image Link
								</Button>
								<Button
									className="mx-1"
									color="info"
									onClick={() => this.onBtnClick(1)}
									active={this.state.rSelected === 1}
								>
									Saved
								</Button>
							</ButtonGroup>
						</div>
					</ModalFooter>
				</Modal>
			</Aux>
		);
	}
}

export default RenderSaved;
