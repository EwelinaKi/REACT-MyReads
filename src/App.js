import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import Book from "./Book"
import Shelf from "./Shelf"
import './App.css'



const SHELVES = [["currentlyReading", "Currently Reading"], ["read", "Read"], ["wantToRead", "Want to Read"]];


class BooksApp extends React.Component {

    state = {
        books: [],
        searchBooks: [],
        query: ""
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books})
        });
    };

    cleanQuery = () => {
        this.setState({
            query: ""
        })
    };



    filteredBooks = (shelf) => {
        return this.state.books.filter(book => book.shelf === shelf);
    };

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
        .then(() => { book.shelf = newShelf;
        this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat(book),
            }))
        });
    };

    updateQuery = (query) => {
        this.setState({
            query: query
        }, ()  => BooksAPI.search(query).then(books => {
            this.setState({
                searchBooks: books || [],
            });
        }) );


    };


    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={ () =>  (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link
                                to="/"
                                className="close-search"
                            >Close</Link>

                            <div className="search-books-input-wrapper">
                                <input type="text"
                                       placeholder="Search by title or author"
                                       value={this.state.query}
                                       autoFocus
                                       onChange={event => this.updateQuery(event.target.value)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.searchBooks.length > 0 && this.state.searchBooks.map(book =>
                                    <Book
                                        key={book.id}
                                        thisBook={book}
                                        allBooks={this.state.books}
                                        changeShelf={this.changeShelf}
                                    />
                                )}
                            </ol>
                        </div>
                    </div>
                )}/>
                <Route exact path="/" render={ () => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {
                                    SHELVES.map((shelf, idx) =>
                                        <Shelf
                                            key={idx}
                                            shelfName={shelf[1]}
                                            books={this.filteredBooks(shelf[0])}
                                            changeShelf={this.changeShelf}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="open-search">
                            <Link
                                to="/search"
                                id="pulse"
                                onClick={this.cleanQuery}
                            >Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default withRouter(BooksApp)
