import React, { Component } from 'react';

import Search from '../containers/Search';
import Article from '../components/Article';

class Home extends Component {
	state = {
		articles: [],
		afterSearch: false,
	};

	onSubmitBtnHandler = (articles) => {
		this.setState({
			articles: articles,
			afterSearch: true,
		});
	};

	render() {
		return (
			<div className="containter mt-2">
				<div className="row">
					<div className="col col-md-3">
						<Search onSubmitBtnHandler={(e) => this.onSubmitBtnHandler(e)} />
					</div>
					<div className="col col-md-9">
						{this.state.articles.length !== 0 ? (
							this.state.articles.map((article, indx) => {
								return <Article key={indx} article={article} />;
							})
						) : this.state.afterSearch ? (
							<div className="container m-5">
								<h2>No Articles found. Try differnt search</h2>
							</div>
						) : (
							<div className="container m-5">
								<h2>Welcome! Try searching... Dates are optional</h2>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
