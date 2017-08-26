import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {

	static propTypes = {
		onUpdateBook: PropTypes.func.isRequired
	};

	state = {
		query: '',
		books: []
	};

	updateQuery = (query) => {
		this.setState({query}, () => {

			// Search books that match the query.
			if (query.length > 0) {
				this.searchBooks(query, 5)
					.then(books => this.assignShelfToBooks(books))
					.then(books => this.setState({books}))
					.catch((err) => this.setState({books: []}));
			}
			else {
				// If the query is empty, clear the search results.
				this.setState({books: []});
			}
		});
	};

	assignShelfToBooks = (books) => {
		return Promise.all(books.map(book => BooksAPI.get(book.id)));
	};

	searchBooks = (query, maxResults) => {
		return new Promise((resolve, reject) => {
			// Search for books that match the query.
			BooksAPI.search(query, maxResults)
				.then(books => {
					// If there are no search results, clear the search results.
					if (books.error === "empty query") {
						reject(books.error);
					}
					else {
						resolve(books);
					}
				})
		})
	};

	displayBooks() {
		const {onUpdateBook} = this.props;
		const {books} = this.state;

		// Check if at least one book exists in the array.
		if (books.length !== 0) {
			return (
				books
					.map(book => (
						<li key={book.id}>
							<Book book={book} onUpdateBook={onUpdateBook}/>
						</li>
					))
			)
		}
		return "";
	}

	render() {
		const {query} = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
						       placeholder="Search by title or author"
						       value={query}
						       onChange={(event) => this.updateQuery(event.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.displayBooks()}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks;