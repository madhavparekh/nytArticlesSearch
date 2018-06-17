import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "../src/components/Home";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saved: true,
		};
	}

	render() {
		return <Router>
		<Switch>
			<Route exact path='/' component={Home}/>
		</Switch>

		</Router>;
	}
}

export default App;
