import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Search from '../containers/Search';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<Navbar color="secondary" dark expand="md">
					<NavbarBrand href="/">NY Times - Search Articles</NavbarBrand>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/SavedArticles/" light>
								Saved Articles
							</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
				<div className="containter mt-2">
					<div className="row">
						<div className="col col-md-3">
							<Search />
						</div>
						<div className="col col-md-9">Articles</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
