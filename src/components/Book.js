import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	};

	handleShelfChange = (e) => {
		e.preventDefault();
		const {book, onUpdateBook} = this.props;
		const shelf = e.target.value;
		onUpdateBook(book, shelf);
	};

	render() {
		const {book} = this.props;

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book.imageLinks.thumbnail})`
					}}></div>
					<div className="book-shelf-changer">
						<select onChange={this.handleShelfChange} defaultValue={book.shelf}>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors.toString()}</div>
			</div>
		)
	}
}

export default Book;