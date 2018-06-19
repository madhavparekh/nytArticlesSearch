import React, { Component } from 'react';
import {
	Button,
	ButtonGroup,
	Alert,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import Aux from '../hoc/Auxilary';
import RenderComments from './RenderComments';

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
		this.toggle();
		var res = await fetch(`/article/saved/${this.props.article._id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify(this.props.article),
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
					<h5>{this.props.article.headline}</h5>
				</Alert>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>
						{this.props.article.headline}
					</ModalHeader>
					<ModalBody>
						<div>
							{this.props.article.snippet
								? this.props.article.snippet
								: 'Click Article Link for detail'}
						</div>
						<hr />
						<RenderComments article={this.props.article} />
					</ModalBody>
					<ModalFooter>
						<div className="row">
							<ButtonGroup className="col-sm-12">
								<Button
									color="secondary"
									className="mx-1"
									href={this.props.article.web_url}
									target="_blank"
								>
									Article Link
								</Button>
								<Button
									className="mx-1"
									color="info"
									onClick={() => this.onBtnClick(1)}
									// active={this.state.rSelected === 1}
								>
									Delete
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
