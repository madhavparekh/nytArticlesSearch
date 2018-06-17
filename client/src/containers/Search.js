import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Aux from '../hoc/Auxilary';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			q: '',
			begin_date: '',
			end_date: '',
			endDateInPast: true,
		};
	}

	changeHandler = (e) => {
		let stateName = e.target.name;

		if (stateName === 'end_date' && this.state.begin_date)
			this.validateDates(e.target.value);

		this.setState({
			[stateName]: e.target.value,
		});
	};

	onClickHandler = (e) => {
		e.preventDefault();

		console.log(this.state);
	};

	validateDates = (endDate) => {
		if (Date.parse(endDate) >= Date.parse(this.state.begin_date))
			this.setState({ endDateInPast: true });
		else this.setState({ endDateInPast: false });
	};

	render() {
		return (
			<Aux>
				<Form>
					<FormGroup>
						<Label for="exampleSearch">Search Text*</Label>
						<Input
							type="search"
							name="q"
							id="exampleSearch"
							placeholder="Donald Trump lies again"
							value={this.state.q}
							onChange={(e) => this.changeHandler(e)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="begin_date">Begin Date</Label>
						<Input
							type="date"
							name="begin_date"
							id="begin_date"
							placeholder="Optional"
							value={this.state.begin_date}
							onChange={(e) => this.changeHandler(e)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="end_date">End Date</Label>
						<Input
							type="date"
							name="end_date"
							id="end_date"
							placeholder="Optional"
							invalid={!this.state.endDateInPast}
							value={this.state.end_date}
							onChange={(e) => this.changeHandler(e)}
						/>
						{!this.state.endDateInPast && (
							<p>End Date must be after {this.state.begin_date} </p>
						)}
					</FormGroup>
					<hr />
					<p>* Required</p>
					<Button
						disabled={!this.state.endDateInPast}
						onClick={(e) => this.onClickHandler(e)}
					>
						Submit
					</Button>
				</Form>
			</Aux>
		);
	}
}

export default Search;
