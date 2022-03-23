import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Grid, Button } from "@mui/material";
import VerticalCard from "../../base/VerticalCard";
import Playlist from "../Playlist";
import { SET_PLAYLIST } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";

const Searchresult = ({
  data = {},
  onClickSeeAll,
  showAllSearchedTracks = false,
}) => {
  const [{ playlist }, dispatch] = useStateValue();
  const { tracks, artists } = data;

  const getFourTracks = useCallback(() => {
    if (!showAllSearchedTracks) {
      if (tracks?.items) {
        dispatch({
          type: SET_PLAYLIST,
          playlist: {
            loading: false,
            tracks: tracks.items
              .slice(0, 3)
              .map((item, index) => ({ ...item, id: index + 1 })),
          },
        });
      }
    }
  }, [dispatch, tracks, showAllSearchedTracks]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {tracks && (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "medium" }}
            >
              Tracks
            </Typography>
            {playlist.tracks.length < tracks.items?.length && (
              <Button size="small" onClick={onClickSeeAll}>
                See All
              </Button>
            )}
          </>
        )}
      </Box>
      <Playlist fetchTracks={getFourTracks} />
      <Typography variant="h5" component="div" sx={{ fontWeight: "medium" }}>
        Artists
      </Typography>
      <Grid container rowSpacing={2} columnSpacing={3}>
        {artists.items.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} xl={2} key={index} zeroMinWidth>
            <VerticalCard data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Searchresult.propTypes = {};

export default Searchresult;
