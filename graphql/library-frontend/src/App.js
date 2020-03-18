import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient
} from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
const ME = gql`
  {
    me {
      favoriteGenre
    }
  }
`;
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
      author {
        name
        born
        bookCount
      }
      genres
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
      author {
        name
        born
        bookCount
      }
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
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`;
const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const includedIn = (set, object) =>
        set.map(p => p.id).includes(object.id);

      const book = subscriptionData.data.bookAdded;
      alert(`new book by ${book.author.name}: ${book.title}`);

      const dataInStore = client.readQuery({ query: ALL_BOOK });

      if (!includedIn(dataInStore.allBooks, book)) {
        dataInStore.allBooks.push(book);
        client.writeQuery({
          query: ALL_BOOK,
          data: dataInStore
        });
      }
    }
  });

  const handleError = error => {
    console.log(error);
    setErrorMessage('error to proceed');
  };
  const [login] = useMutation(LOGIN, {
    onError: handleError
  });
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOK }, { query: ALL_AUTHOR }]
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError
  });
  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>;
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <div>
            {errorNotification()}
            <h2>Login</h2>
            <LoginForm login={login} setToken={token => setToken(token)} />
          </div>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors
        token={token}
        editAuthor={editAuthor}
        authors={useQuery(ALL_AUTHOR)}
        show={page === 'authors'}
      />

      <Books books={useQuery(ALL_BOOK)} show={page === 'books'} />

      <NewBook addBook={addBook} show={page === 'add'} />
      <Recommend
        books={useQuery(ALL_BOOK)}
        user={useQuery(ME)}
        show={page === 'recommend'}
      />
    </div>
  );
};

export default App;
