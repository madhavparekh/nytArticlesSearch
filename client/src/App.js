import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Scrape from './components/Scrape';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrapeBtnClicked: false,
		};
		this.handler = this.handler.bind(this);
	}
	handler() {
		this.setState({
			scrapeBtnClicked: !this.state.scrapeBtnClicked,
		});
	}

	render() {
		return (
			<div className="App">
				<Jumbotron className="m-2 p-2">
					<h1 className="app-name">Twitter Moments Scrapper</h1>
					<p className="lead">
						This app scrapes News articles from Twitter Moments. Try it out
					</p>
					<hr className="my-2" />
					<p className="lead">
						<Scrape btnClicked={this.handler} />
					</p>
				</Jumbotron>
				{this.state.scrapeBtnClicked && <Button>Render Tweets</Button>}
			</div>
		);
	}
}

export default App;
