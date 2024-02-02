// src/services/BookService.js
import axios from 'axios';

// const BASE_URL = 'https://openlibrary.org';
const BASE_URL = '/api';

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
    return response.data.docs;
  } catch (error) {
    console.error("Fehler beim Laden der Suchergebnisse:", error);
    throw error;
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const formattedBookId = bookId.startsWith('/works/') ? bookId.substring(7) : bookId;
    const response = await axios.get(`${BASE_URL}/works/${formattedBookId}.json`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Buchdetails:", error);
    throw error;
  }
};

export const getAuthorDetails = async (authorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/authors/${encodeURIComponent(authorId)}.json`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Autorendetails:", error);
    throw error;
  }
};
