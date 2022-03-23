import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import HomePage from "../page/HomePage";
import SearchPage from "../page/Search/SearchPage";
import CategoryList from "../page/Search/CategoryList";
import Playlist from "../page/Playlist";
import ArtistTopTracks from "../page/ArtistTopTracks";
import AllSearchedTracks from "../page/Search/AllSearchedTracks";

function Content() {
  return (
    <Container maxWidth="xl" sx={{ py: 3, height: "100%" }}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:category" element={<CategoryList />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<ArtistTopTracks />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </Container>
  );
}

export default Content;
