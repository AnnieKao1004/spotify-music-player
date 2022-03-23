import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box, TextField } from "@mui/material";
import Browse from "./Browse";
import SearchResult from "./SearchResult";
import AllSearchedTracks from "./AllSearchedTracks";
import { useStateValue } from "../../../StateProvider";
import { getSpotify } from "../../../utils/spotify";

const SearchPage = () => {
  const [{ token }] = useStateValue();
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showAllSearchedTracks, setShowAllSearchedTracks] = useState(false);

  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    if (token) {
      const json = await getSpotify(token, "/browse/categories");

      setCategories(json.categories.items);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const searchArtist = useCallback(async () => {
    if (searchString) {
      const json = await getSpotify(token, "/search", {
        type: "artist",
        q: `artist:${searchString}`,
      });
      if (json) {
        setSearchResult((result) => ({ ...result, artists: json.artists }));
      }
    } else {
      setSearchResult(null);
    }
  }, [searchString, token]);

  const searchAlbum = useCallback(async () => {
    if (searchString) {
      const json = await getSpotify(token, "/search", {
        type: "album,track",
        q: `album:${searchString}`,
      });
      if (json) {
        setSearchResult((result) => ({
          ...result,
          albums: json.albums,
          tracks: json.tracks,
        }));
      }
    } else {
      setSearchResult(null);
    }
  }, [searchString, token]);

  const search = useCallback(async () => {
    await searchArtist();
    await searchAlbum();
  }, [searchArtist, searchAlbum]);

  useEffect(() => {
    search();
  }, [search]);

  const onClickSeeAll = () => {
    setShowAllSearchedTracks(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "16px" }}>
      {!showAllSearchedTracks && (
        <TextField
          size="small"
          placeholder="Search for artist or track"
          sx={{ width: "300px" }}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      )}
      {searchResult ? (
        showAllSearchedTracks ? (
          <AllSearchedTracks
            data={searchResult.tracks}
            setShowAllSearchedTracks={setShowAllSearchedTracks}
          />
        ) : (
          <SearchResult
            data={searchResult}
            onClickSeeAll={onClickSeeAll}
            showAllSearchedTracks={showAllSearchedTracks}
          />
        )
      ) : (
        <>
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "medium" }}
            >
              Browse all
            </Typography>
          </Box>
          <Browse data={categories} />
        </>
      )}
    </Box>
  );
};

export default SearchPage;
