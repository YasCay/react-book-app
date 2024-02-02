import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const books = [
  {
    title: "All About Love",
    author: "bell hooks",
    description:
      "O que é o amor, afinal? Será esta uma pergunta tão subjetiva, tão opaca? Para bell hooks, quando pulverizamos...",
    cover: "https://covers.openlibrary.org/b/isbn/9780060959470-L.jpg",
  },
  {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    description:
      "Here is the first volume in George R. R. Martin’s magnificent cycle of novels that includes A Clash of Kings and A...",
    cover: "https://covers.openlibrary.org/b/isbn/9780553381689-L.jpg",
  },
  {
    title: "Red, White & Royal Blue",
    author: "Casey McQuiston",
    description:
      "When his mother became President of the United States, Alex Claremont-Diaz was promptly cast as the American...",
    cover: "https://covers.openlibrary.org/b/isbn/9781250316776-L.jpg",
  },
];

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 4 }}>
      <Card sx={{ maxWidth: 600, width: "100%", mb: 4, backgroundColor: "#424242" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="#FFFFFF">
            Welcome to the Book Search Platform
          </Typography>
          <Typography variant="body2" color="#FFFFFF">
            This is your go-to place for books and reviews. Start searching now!
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
        {books.map((book, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 300, width: "100%", display: "flex", flexDirection: "column", backgroundColor: "#424242" }}
          >
            <Box className="book-cover" sx={{ width: "100%" }}>
              <CardMedia component="img" image={book.cover} alt="Book Cover" />
            </Box>
            <CardContent>
              <Typography variant="h6" component="div" color="#FFFFFF">
                {book.title}
              </Typography>
              <Typography gutterBottom variant="body2" color="#c7c7c7">
                {book.author}
              </Typography>
              <Typography variant="body2" color="#FFFFFF">
                {book.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
