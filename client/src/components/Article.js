import React, { Component } from 'react';
import {
	Button,
	ButtonGroup,
	Alert,
	Card,
	CardBody,
	Collapse,
	CardText,
} from 'reactstrap';
import Aux from '../hoc/Auxilary';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
			isSaved: false,
		};
	}

	onBtnClick = async (e) => {
		this.toggle();
		var res = await fetch(`/article/save`, {
			method: 'POST',
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
		}
	};

	toggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};

	render() {
		return (
			<Aux>
				<div className="m-2">
					<Alert
						color="primary"
						onClick={this.toggle}
						style={{ marginBottom: '1rem' }}
					>
						<h5>{this.props.article.headline}</h5>
					</Alert>
					<Collapse isOpen={this.state.collapse}>
						<Card>
							<CardBody>
								<CardText>
									{this.props.article.snippet ||
										'Click on Article Link for more details'}
								</CardText>
								<CardText>
									{this.props.article.source &&
										`Source: ${this.props.article.source}`}
									{this.props.article.pub_date &&
										` |	Published On:
									${this.props.article.pub_date}`}
								</CardText>
								<ButtonGroup>
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
										active={this.state.rSelected === 1}
									>
										Save
									</Button>
								</ButtonGroup>
							</CardBody>
						</Card>
					</Collapse>
				</div>
			</Aux>
		);
	}
}

export default Article;
