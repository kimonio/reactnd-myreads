import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';

// Components.
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends Component {

	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			console.log(books);
			this.setState({books});
		});
	}

	render() {
		return (
			<div className="app">
				<Route
					exact path="/"
					render={() => (
						<ListBooks
							books={this.state.books}
						/>
					)}
				/>

				<Route
					path="/search"
					render={() => (
						<SearchBooks/>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
