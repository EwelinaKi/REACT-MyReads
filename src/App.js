import React from 'react'
import * as BooksAPI from "./BooksAPI";
import './App.css'
import Shelf from "./Shelf"
import Book from "./Book"


const SHELVES = [["currentlyReading", "Currently Reading"], ["read", "Read"], ["wantToRead", "Want to Read"]];


class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        books: [],
        allBooks: [],
        query: ""
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    };

    filteredBooks = (shelf) => {
        return this.state.books.filter(book => book.shelf === shelf);
    };

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
            .then(() => BooksAPI.getAll())
            .then((books) => {
                    this.setState({
                        books: books,
                        showSearchPage: false
                    })
                }
            );
    };

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        }, ()  => BooksAPI.search(query).then(books => {
            this.setState({
                allBooks: books || [],
            });
        }) );


    };

    showSearchPage = () => {
        this.setState({showSearchPage: false})
    };


    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.showSearchPage}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input type="text"
                                       placeholder="Search by title or author"
                                       value={this.state.query}
                                       onChange={event => this.updateQuery(event.target.value)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.allBooks.length > 0 && this.state.allBooks.map(book =>
                                    <Book
                                        key={book.id}
                                        thisBook={book}
                                        changeShelf={this.changeShelf}
                                    />
                                )}
                            </ol>
                        </div>
                    </div>
                ) : (
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
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
