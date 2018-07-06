import React from 'react'
import Book from "./Book"


const Shelf = (props) => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books &&
                        props.books.map((book) =>
                            <Book
                                key={book.id}
                                thisBook={book}
                                changeShelf={props.changeShelf}
                            />
                        )}
                    </ol>
                </div>
            </div>
        )

};

export default Shelf;