import React, { Component } from 'react'
import './App.css'

class Book extends Component {

  state = {
    shelf: this.props.shelf || 'none'
  }

  handleShelfChange = event => {
    this.setState({
      shelf: event.target.value
    });
    this.props.updateBook(this.props.book, event.target.value);
  }

  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.handleShelfChange.bind(this)} >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book && book.authors && book.authors.map(author => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book