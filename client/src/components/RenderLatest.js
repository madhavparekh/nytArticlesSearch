import React, { Component } from 'react';
import {
	Button,
	ButtonGroup,
	Alert,
	Card,
	CardBody,
	Collapse,
	CardImg,
	CardText,
	CardLink,
} from 'reactstrap';
import Aux from '../hoc/Auxilary';

class RenderLatest extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collapse: false,
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

			// this.setState({
			// 	isSaved: !this.state.isSaved,
			// });
		}
	};

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	render() {
		return (
			<Aux>
				<div className="m-2">
					<Alert
						color="primary"
						onClick={this.toggle}
						style={{ marginBottom: '1rem' }}
					>
						<h5>{this.props.item.title}</h5>
					</Alert>
					<Collapse isOpen={this.state.collapse}>
						<Card>
							<CardBody>
								<CardText>{this.props.item.description}</CardText>
								<ButtonGroup>
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
								</ButtonGroup>
							</CardBody>
							<div className="text-center">
								<Button
									className="col-sm-1 m-2"
									color="info"
									onClick={() => this.onBtnClick(1)}
									active={this.state.rSelected === 1}
								>
									{this.props.item.isSaved ? 'Saved' : 'Save'}
								</Button>
							</div>
						</Card>
					</Collapse>
				</div>
			</Aux>
		);
	}
}

export default RenderLatest;
