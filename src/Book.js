import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        thisBook: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired,
    };

    onSelect = (event) => this.props.changeShelf(this.props.thisBook, event.target.value);

    render() {

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover">
                            {this.props.thisBook.imageLinks &&
                                <img src={this.props.thisBook.imageLinks.thumbnail} alt={this.props.thisBook.title}/>
                            }
                        </div>
                        <div className="book-shelf-changer">
                            <select value={this.props.thisBook.shelf || "none"} onChange={this.onSelect}>
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