import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from "./Book"


class Shelf extends Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
    };
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books &&
                        this.props.books.map((book) =>
                            <Book
                                key={book.id}
                                thisBook={book}
                                changeShelf={this.props.changeShelf}
                            />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;