import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBookFn, { loading: bookLoading }] = useMutation(addBookMutation);

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else if (error) {
      return <option disabled>Error occurred...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!name || !genre || !authorId) {
      alert("Fill in all the details to add book");
      return;
    }

    addBookFn({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="addBook__form" onSubmit={submitForm}>
      <div className="addBook__form__field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
      </div>

      <div className="addBook__form__field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)}></input>
      </div>

      <div className="addBook__form__field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option key="selectAuthor">Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
