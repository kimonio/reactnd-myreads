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

	updateBook = (book, shelf) => {
		// Update the book with the books API.
		BooksAPI.update(book, shelf).then(() => {
			// Update the book in the state object.
			this.setState(() => ({
				books: this.state.books.map(b => b.id === book.id ?
					// transform the book with a matching id
					{ ...b, shelf } :
					// otherwise return original book
					b)
			}));
		});
	};

	render() {
		return (
			<div className="app">
				<Route
					exact path="/"
					render={() => (
						<ListBooks
							books={this.state.books}
							onUpdateBook={this.updateBook}
						/>
					)}
				/>
				<Route
					path="/search"
					render={() => (
						<SearchBooks
							onUpdateBook={this.updateBook}
						/>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
