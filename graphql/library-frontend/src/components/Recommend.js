import React from 'react';

const Recommend = props => {
  if (!props.show) {
    return null;
  }
  if (props.books.loading && props.user.loading) {
    return <div>loading...</div>;
  }
  console.log(props.user.data.me.favoriteGenre);
  return (
    <>
      {props.books.data.allBooks.filter(book =>
        book.genres.find(genre => genre === props.user.data.me.favoriteGenre)
      ).length > 0
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
