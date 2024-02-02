import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Card, CardContent, Typography, CardMedia, Container } from "@mui/material";
import { getBookDetails, getAuthorDetails } from "../services/BookService";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setIsLoading(true);
      try {
        const bookDetails = await getBookDetails(id);
        setBook(bookDetails);
        if (bookDetails.authors) {
          const authorDetailsPromises = bookDetails.authors.map(async (author) => {
            const authorDetails = await getAuthorDetails(author.key.split("/").pop());
            return authorDetails.name;
          });
          const authorNames = await Promise.all(authorDetailsPromises);
          setAuthors(authorNames);
        }
      } catch (error) {
        console.error("Error loading book details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <Container sx={{ mt: 3, display: "flex", justifyContent: "center" }} maxWidth="100%">
      {isLoading ? (
        <CircularProgress />
      ) : book ? (
        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "start", backgroundColor: "#424242", color: "white" }}>
          {book.covers?.[0] && (
            <CardMedia
              component="img"
              sx={{ width: "300px", height: "100%", mr: 2 }}
              image={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={`${book.title} cover`}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Authors: {authors.join(", ")}
            </Typography>
            {book.created && (
              <Typography variant="body1" gutterBottom>
                Created:{" "}
                {new Date(book.created.value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            )}
            {book.last_modified && (
              <Typography variant="body1" gutterBottom>
                Last Modified:{" "}
                {new Date(book.last_modified.value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            )}
            {book.description && <Typography variant="body2">Description: {book.description.value}</Typography>}
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="text.secondary">
          Book details could not be loaded.
        </Typography>
      )}
    </Container>
  );
}

export default BookDetails;
