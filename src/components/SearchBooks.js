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
		this.setState({query});

		// Make a request to the search API if query length is greater than 0.
		if (query.length > 0) {
			this.searchBooks(query, 5);
		}
		else {
			// If query is empty, clear the search results.
			this.setState({query: '', books: []});
		}
	};

	searchBooks = (query, maxResults) => {

		// Search for books that match the query.
		BooksAPI.search(query, maxResults)
			.then(books => {
				// If there are no search results, clear the search results.
				if (books.error === "empty query" || this.state.query.length === 0) {
					this.setState({books: []});
				}
				else {
					this.setState({books});
				}
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