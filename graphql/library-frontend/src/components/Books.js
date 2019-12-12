import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
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

let genres = [];
const Books = props => {
  const client = useApolloClient(ALL_BOOKS);
  const [book, setBook] = useState(null);
  if (!props.show) {
    return null;
  }

  if (props.books.loading) {
    return <div>loading...</div>;
  }
  console.log(props.books.data.allBooks);
  props.books.data.allBooks.forEach(a => {
    genres = genres.concat(a.genres);
  });
  const sortByGenre = async genre => {
    const { data } = await client.query({
      query: ALL_BOOKS,
      variables: { genre }
    });
    setBook(data.allBooks);
  };
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!book
            ? props.books.data.allBooks.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                );
              })
            : book.map((a, i) => {
                return (
                  <tr key={i}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {genres.length > 0
        ? [...new Set(genres)].map((g, i) => (
            <button onClick={() => sortByGenre(g)} key={i}>
              {g}
            </button>
          ))
        : null}
      <button onClick={() => setBook(null)}>all genres</button>
    </div>
  );
};

export default Books;
