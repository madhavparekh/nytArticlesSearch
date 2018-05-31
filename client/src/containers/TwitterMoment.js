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

class TwitterMoment extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collapse: false,
			moments: [],
		};
		this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
		this.renderMoments = this.renderMoments.bind(this);
	}

	componentDidMount = async () => {
		var res = await fetch('/moments', {
			method: 'GET',
		});
		if (res.status === 401) {
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			this.setState({
				moments: res,
			});
		}
	};

	renderMoments = (moments) => {
		//console.log(moments);
		return moments.map((i, indx) => {
			return (
				<div className="m-2" key={indx}>
					<Alert
						color="primary"
						onClick={this.toggle}
						style={{ marginBottom: '1rem' }}
					>
						<h5>{i.title}</h5>
					</Alert>
					<Collapse isOpen={this.state.collapse}>
						<Card>
							<CardBody>
								<CardText>{i.description}</CardText>
								<ButtonGroup>
									<Button
										color="secondary"
										className="mx-1"
										href={i.link}
										target="_blank"
									>
										Article Link
									</Button>
									<Button
										color="secondary"
										className="mx-1"
										href={i.img}
										target="_blank"
									>
										Image Link
									</Button>
									<Button color="secondary" className="mx-1">
										Likes: {i.likes}
									</Button>
								</ButtonGroup>
							</CardBody>
							<div className="text-center">
								<Button
									className="col-sm-1 m-2"
									color="info"
									onClick={() => this.onRadioBtnClick(1)}
									active={this.state.rSelected === 1}
								>
									Save
								</Button>
							</div>
						</Card>
					</Collapse>
				</div>
			);
		});
	};

	onRadioBtnClick(rSelected) {
		this.setState({ rSelected });
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	render() {
		return <Aux>{this.renderMoments(this.state.moments)}</Aux>;
	}
}

export default TwitterMoment;
