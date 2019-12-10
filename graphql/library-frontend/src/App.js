import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const ALL_AUTHOR = gql`
    {
      allAuthors {
        name
        born
        id
        bookCount
      }
    }
  `;
  const ALL_BOOK = gql`
    {
      allBooks {
        title
        published
        author
      }
    }
  `;
  const ADD_BOOK = gql`
    mutation addBook(
      $title: String!
      $published: Int!
      $author: String!
      $genres: [String]
    ) {
      addBook(
        title: $title
        published: $published
        author: $author
        genres: $genres
      ) {
        title
        published
        author
      }
    }
  `;
  const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        id
        bookCount
      }
    }
  `;
  const handleError = error => {
    console.log(error);
  };
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOK }, { query: ALL_AUTHOR }]
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError
  });
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        editAuthor={editAuthor}
        authors={useQuery(ALL_AUTHOR)}
        show={page === 'authors'}
      />

      <Books books={useQuery(ALL_BOOK)} show={page === 'books'} />

      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  );
};

export default App;
