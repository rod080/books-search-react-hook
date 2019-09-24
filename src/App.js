import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm ] = useState('');
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const [books, setBooks] = useState({ items: [] });

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    console.log(result.data);
    setBooks(result.data);
  }
  const onSubmitHandler = (e) => {
    e.preventDfault();
    fetchBooks();
  }

  return (
    <section>
      <form onSubmit = {onSubmitHandler} >
        <label>
          <span>Search for a book!</span>
          <input
            type="search"
            placeholder="microservice, restful design, etc.,"
            value = {setSearchTerm}
            onChange = {onInputChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>
      <ul>
        {
          books.items.map((book, index) => {
            return (
              <li key={index}>
                <div>
                  <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                  <div>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.publishedDate}</p>
                  </div>
                </div>
                <hr />
              </li>
            );
          })
        }
      </ul>
    </section>
    
  );
};

export default App;