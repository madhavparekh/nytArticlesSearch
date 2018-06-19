import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { Modal, ModalHeader } from 'reactstrap';

import io from 'socket.io-client';

import Home from '../src/containers/Home';
import SavedArticles from '../src/containers/SavedArticles';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: 'http://127.0.0.1:3001',
			saved: false,
			modal: false,
		};
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = io(endpoint);
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
								<NavLink href="/">Search</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/SavedArticles/">Saved Articles</NavLink>
							</NavItem>
						</Nav>
					</Navbar>
					<Route exact path="/" component={Home} />
					<Route exact path="/SavedArticles" component={SavedArticles} />

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
