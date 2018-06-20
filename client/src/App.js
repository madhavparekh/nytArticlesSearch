import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import { Modal, ModalHeader } from 'reactstrap';

import io from 'socket.io-client';

import Home from '../src/containers/Home';
import SavedArticles from '../src/containers/SavedArticles';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saved: false,
			modal: false,
		};
	}

	componentDidMount() {
		const socket = io();
		socket.on('connection', (savedFlag) => {
			this.setState({ modal: savedFlag });
		});
	}

	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};

	render() {
		return (
			<Router>
				<div className="container">
					<Navbar color="secondary" dark expand="md">
						<NavbarBrand href="/">NY Times - Search Articles</NavbarBrand>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink
									exact
									activeStyle={{
										color: 'darkgray',
									}}
									style={{ color: 'white' }}
									to="/"
								>
									Search
								</NavLink>
							</NavItem>
							<NavItem className="mx-3">
								<NavLink
									exact
									activeStyle={{
										color: 'darkgray',
									}}
									style={{ color: 'white' }}
									to="/SavedArticles"
								>
									Saved Articles
								</NavLink>
							</NavItem>
						</Nav>
					</Navbar>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/SavedArticles" component={SavedArticles} />
					</Switch>
					<Modal isOpen={this.state.modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>
							Some one saved an article!
						</ModalHeader>
					</Modal>
				</div>
			</Router>
		);
	}
}

export default App;
