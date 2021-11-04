import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from "../queries";

const Authors = props => {
  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [ALL_AUTHORS]
  });
  const [authors, setAuthors] = useState([]);

  const [formYear, setFormYear] = useState("");
  const [formOptions, setFormOptions] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleSelectChange = option => {
    setSelectedAuthor(option);
  };

  const updateBirthYear = e => {
    e.preventDefault();

    updateAuthor({
      variables: { name: selectedAuthor.value, setBornTo: parseInt(formYear) }
    });

    setSelectedAuthor(null);
    setFormYear("");
  };

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
      setFormOptions(
        result.data.allAuthors.map(author => {
          return { value: author.name, label: author.name };
        })
      );
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

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
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={updateBirthYear}>
        <div>
          name
          <Select
            value={selectedAuthor}
            onChange={handleSelectChange}
            options={formOptions}
          />
        </div>
        <div>
          born
          <input
            value={formYear}
            onChange={({ target }) => setFormYear(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
