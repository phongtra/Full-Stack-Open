import React from 'react';

const Recommend = props => {
  if (!props.show || !props.books.data.allBooks) {
    return null;
  }
  const book = props.books.data.allBooks;
  const genre = props.user.data.me.favoriteGenre;
  return (
    <>
      {book.filter(book => book.genres.includes(genre)).length > 0
        ? props.books.data.allBooks
            .filter(book =>
              book.genres.find(
                genre => genre === props.user.data.me.favoriteGenre
              )
            )
            .map((a, i) => {
              return (
                <tr key={i}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              );
            })
        : 'no recommendation'}
    </>
  );
};

export default Recommend;
