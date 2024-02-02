import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../services/BookService";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goToBookDetails = (key) => {
    navigate(`/details/${key.split("/").pop()}`);
  };

  const search = async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setBooks(results);
    } catch (error) {
      console.error("Error loading the search results", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <TextField
        label="Search for Book"
        variant="filled"
        fullWidth
        sx={{ maxWidth: "600px", '& .MuiInputLabel-root': { color: 'white' }, '& .MuiFilledInput-root': { color: 'white' } }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && search()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={search} sx={{ color: 'white' }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {isLoading ? (
        <CircularProgress sx={{ marginTop: "20px" }} />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          {books.map((book) => (
            <Card
              key={book.key}
              sx={{ width: "100%", maxWidth: "800px", display: "flex", cursor: "pointer", backgroundColor: "#424242", color: "white"  }}
              onClick={() => goToBookDetails(book.key)}
            >
              {book.cover_i && (
                <CardMedia
                  component="img"
                  sx={{ width: "150px" }}
                  image={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt="Book Cover"
                />
              )}
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">{book.author_name?.join(", ")}</Typography>
                <Typography variant="body2">{book.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SearchResults;
