import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Search from '../containers/Search';
import Article from '../components/Article';

class Home extends Component {
	state = { articles: [] };

	onSubmitBtnHandler = (articles) => {
		this.setState({ articles: articles });
	};

	render() {
		return (
			<div className="container">
				<Navbar color="secondary" dark expand="md">
					<NavbarBrand href="/">NY Times - Search Articles</NavbarBrand>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/SavedArticles/">Saved Articles</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
				<div className="containter mt-2">
					<div className="row">
						<div className="col col-md-3">
							<Search onSubmitBtnHandler={(e) => this.onSubmitBtnHandler(e)} />
						</div>
						<div className="col col-md-9">
							{this.state.articles ? (
								this.state.articles.map((article, indx) => {
									return <Article key={indx} article={article} />;
								})
							) : (
								<div>No Articles found. Try differnt search</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
