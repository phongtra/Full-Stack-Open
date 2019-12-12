import React, { useState } from 'react';

const Authors = props => {
  const [author, setAuthor] = useState('');
  const [born, setBorn] = useState('');
  if (!props.show) {
    return null;
  }

  if (props.authors.loading) {
    return <div>Loading...</div>;
  }
  const submit = e => {
    if (!born || !author || isNaN(born)) {
      alert('must have born, author, and born must be a number');
    }
    e.preventDefault();
    props.editAuthor({
      variables: { name: author, setBornTo: parseInt(born) }
    });
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.data.allAuthors.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <>
          <h2>Set Birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <label>name</label>
              <select value={author} onChange={e => setAuthor(e.target.value)}>
                {props.authors.data.allAuthors.map((a, i) => {
                  return (
                    <option key={i} value={a.name}>
                      {a.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label>born</label>
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button>update author</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default Authors;
