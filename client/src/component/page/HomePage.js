import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStateValue } from "./../../StateProvider";
import HorizontalCard from "../base/HorizontalCard";
import VerticalCard from "../base/VerticalCard";
import { getSpotify } from "../../utils/spotify";

function HomePage() {
  const [{ token }] = useStateValue();
  const [featuredPlaylist, setFeaturedPlaylist] = useState({
    loading: true,
    data: Array.from(Array(6), () => {}),
  });
  const [topLists, setTopLists] = useState({
    loading: true,
    data: Array.from(Array(6), () => {}),
  });

  const fetchFeaturedPlaylist = useCallback(async () => {
    if (token) {
      const json = await getSpotify(token, "/browse/featured-playlists", {
        limit: 6,
      });

      setFeaturedPlaylist({ loading: false, data: json.playlists.items });
    }
  }, [token]);

  const fetchTopLists = useCallback(async () => {
    if (token) {
      const json = await getSpotify(
        token,
        "/browse/categories/toplists/playlists",
        {
          limit: 10,
        }
      );

      setTopLists({ loading: false, data: json?.playlists?.items });
    }
  }, [token]);

  useEffect(() => {
    fetchFeaturedPlaylist();
  }, [fetchFeaturedPlaylist]);

  useEffect(() => {
    fetchTopLists();
  }, [fetchTopLists]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
      <div>
        <Typography
          variant="h4"
          component="div"
          sx={{ mb: 2, fontWeight: "medium" }}
        >
          Welcome
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={3} zeroMinWidth>
          {featuredPlaylist.data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} xl={4} key={index}>
              <HorizontalCard data={item} loading={featuredPlaylist.loading} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 2, fontWeight: "medium" }}
        >
          Top Lists
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={3} zeroMinWidth>
          {topLists.data.map((item, index) => (
            <Grid item xs={12} sm={4} md={3} xl={2} key={index}>
              <VerticalCard data={item} loading={topLists.loading} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}

export default HomePage;
