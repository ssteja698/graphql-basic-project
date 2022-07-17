import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selectedBookId, setSelectedBookId] = useState("");
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else if (error) {
      return <div>Error occurred...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={() => setSelectedBookId(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <h1>SST's Book List</h1>
      <ul id="bookList__list">{displayBooks()}</ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
}

export default BookList;
