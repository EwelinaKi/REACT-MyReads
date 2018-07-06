import React, {Component} from 'react'
import PropTypes from 'prop-types'


const grayscaleCover = {
    filter: "grayscale(100%)"
};

const colorCover = {
    filter: "none"
};

class Book extends Component {
    static propTypes = {
        thisBook: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired,
        allBooks: PropTypes.array,
    };

    onSelect = (event) => {
        this.props.changeShelf(this.props.thisBook, event.target.value);
    };


    ifBookOnShelf = (element) => {
        return element.id === this.props.thisBook.id
    };


    searchInAllBooks = () => {
        const found = this.props.allBooks.find(this.ifBookOnShelf);
        return found ? found.shelf : "none"
    };




    render() {

        const val = this.props.thisBook.shelf ? this.props.thisBook.shelf : this.searchInAllBooks();

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover">
                            {console.log(this.props.thisBook)}
                            {this.props.thisBook.imageLinks &&
                            <img src={this.props.thisBook.imageLinks.thumbnail}
                                 alt={this.props.thisBook.title}
                                 style={ this.props.thisBook.shelf ? colorCover : grayscaleCover }
                                />
                            }
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                value={val}
                                onChange={this.onSelect}>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.thisBook.title}</div>
                    <div className="book-authors">{this.props.thisBook.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book;