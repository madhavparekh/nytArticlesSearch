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

	onClickHandler = async (e) => {
		let searchParam = {};
		searchParam.q = this.state.q;

		if (this.state.begin_date)
			searchParam.begin_date = this.state.begin_date.replace(/-/g, '');

		if (this.state.end_date)
			searchParam.end_date = this.state.end_date.replace(/-/g, '');

		var res = await fetch('/search', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			credentials: 'same-origin',
			body: JSON.stringify(searchParam),
		});
		if (res.status === 401) {
			console.log('error');
			this.setState({ fail: true });
		} else if (res.status === 200) {
			res = await res.json();
			console.log(res);
			this.props.onSubmitBtnHandler(res);
		}

		// request
		// 	.post('/search')
		// 	.send(searchParam) // sends a JSON post body
		// 	.set('accept', 'json')
		// 	.end((err, res) => {
		// 		// Calling the end function will send the request
		// 		if (err) throw err;
		// 		this.props.onSubmitBtnHandler(res.body);
		// 	});
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
