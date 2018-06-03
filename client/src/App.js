import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

import Scrape from './components/Scrape';
import SacBeeLatest from './containers/SacBeeLatest';
import SavedArticlesBtn from './components/SavedArticlesBtn';
import SavedArticles from './containers/SavedArticles';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrapeBtnClicked: 0,
			displaySaved: false,
		};
		this.handler = this.handler.bind(this);
		this.savedHandler = this.savedHandler.bind(this);
	}
	handler() {
		this.setState({
			scrapeBtnClicked: this.state.scrapeBtnClicked + 1,
		});
	}

	savedHandler(action) {
		this.setState({
			displaySaved: action,
		});
	}

	render() {
		return (
			<div className="App text-center">
				<Jumbotron className="m-2 p-2">
					<h1 className="app-name">Sac Bee Latest News Scrapper</h1>
					<p className="lead">
						This app scrapes News articles from Sac Bee. Try it out
					</p>
					<hr className="my-2" />
					<p className="lead">
						<Scrape
							btnClicked={this.handler}
							savedHandler={this.savedHandler}
						/>
						<SavedArticlesBtn savedHandler={this.savedHandler} />
					</p>
				</Jumbotron>
				<div className="col-sm-9 m-auto">
					{!this.state.displaySaved ? (
						<SacBeeLatest update={this.state.scrapeBtnClicked} />
					) : (
						<SavedArticles />
					)}
				</div>
			</div>
		);
	}
}

export default App;
