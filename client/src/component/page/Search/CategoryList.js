import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import VerticalCard from "../../base/VerticalCard";
import { useStateValue } from "../../../StateProvider";
import { getSpotify } from "../../../utils/spotify";

const CategoryList = () => {
  const { category } = useParams();
  const [{ token }] = useStateValue();
  const [categoryPlaylist, setCategoryPlaylist] = useState({
    loading: false,
    data: [],
  });

  const fetchCategoryPlaylist = useCallback(async () => {
    if (token) {
      const json = await getSpotify(
        token,
        `/browse/categories/${category}/playlists`
      );

      if (json) {
        setCategoryPlaylist({ loading: false, data: json.playlists.items });
      }
    }
  }, [token, category]);

  useEffect(() => {
    fetchCategoryPlaylist();
  }, [fetchCategoryPlaylist]);

  return (
    <Grid container rowSpacing={2} columnSpacing={3}>
      {categoryPlaylist.data.map((item, index) => (
        <Grid item xs={12} sm={4} md={3} xl={2} key={index} zeroMinWidth>
          <VerticalCard data={item} loading={categoryPlaylist.loading} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
