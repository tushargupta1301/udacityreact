import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book';
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    searchBooks: [],
    query: '',
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    testBook: []

  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
          currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
          wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
          read: books.filter((book) => book.shelf === 'read')
        }))
      })
  }

  searchBooks = (query) => {
    if (query !== '') {
      BooksAPI.search(query)
        .then((searchBooks) => {
          this.setState(() => ({
            searchBooks
          }))
        })
    }
  }

  updatesearchResults = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      query: value
    }))

    this.searchBooks(value);
  }

  componentDidMount() {
    this.getAllBooks();
    this.searchBooks(this.state.query);
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((res) => {
        this.getAllBooks();
        this.searchBooks();
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' exact render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={this.updatesearchResults}
                  ref={input => input ? input.focus() : null}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks && this.state.searchBooks.map && this.state.searchBooks.map((book, key) => {
                  const matchedBook = this.state.books && this.state.books.filter((b) => {
                    return book.id === b.id;
                  });
                  return (
                    <Book
                      key={key}
                      updateBook={this.updateBook}
                      book={book}
                      shelf={matchedBook && matchedBook.length > 0 ? matchedBook[0].shelf : null}
                    />
                  )
                })}
              </ol>
            </div>
          </div>
        )} />

        <Route path='/' exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading.map((book, key) => (
                        <Book key={key} updateBook={this.updateBook} book={book} shelf={book.shelf} />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.map((book, key) => (
                        <Book key={key} updateBook={this.updateBook} book={book} shelf={book.shelf} />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.map((book, key) => (
                        <Book key={key} updateBook={this.updateBook} book={book} shelf={book.shelf} />
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button
                // onClick={() => this.setState({ showSearchPage: true })}
                >Add a book</button>
              </Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
