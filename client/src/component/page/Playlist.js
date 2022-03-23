import React, { useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Skeleton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useStateValue } from "../../StateProvider";
import useController from "../../hook/useController";
import { getSpotify } from "../../utils/spotify";
import { SET_PLAYLIST, SET_PLAYER } from "../../reducer";
import DataTable from "../base/DataTable";
import { generateNumber, generateTitle, generateDuration } from "./tableCells";

function Playlist({ fetchTracks }) {
  const [{ token, player, playlist }, dispatch] = useStateValue();
  const { name, cover, tracks } = playlist;
  const [pauseTrack, playTrack] = useController(player, dispatch);
  const { id } = useParams();
  const { pathname } = useLocation();

  const fetchPlaylistTracks = useCallback(async () => {
    if (token) {
      dispatch({
        type: SET_PLAYLIST,
        playlist: {
          loading: true,
        },
      });
      const json = await getSpotify(token, `/playlists/${id}`);

      if (json) {
        dispatch({
          type: SET_PLAYLIST,
          playlist: {
            loading: false,
            name: json.name,
            cover: json.images[0]?.url,
            tracks: json.tracks.items
              .filter((item) => item.track) // filter the track which is null
              .map((item, index) => ({
                ...item.track,
                id: index + 1,
              })),
          },
        });
      }
    }
  }, [token, id, dispatch]);

  useEffect(() => {
    if (fetchTracks) {
      fetchTracks();
    } else {
      fetchPlaylistTracks();
    }
  }, [fetchTracks, fetchPlaylistTracks]);

  // Change to another playlist
  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset playlist & player id
    dispatch({
      type: SET_PLAYER,
      player: {
        id: 0,
      },
    });
    dispatch({
      type: SET_PLAYLIST,
      playlist: { loading: true, name: "", cover: null },
    });
  }, [dispatch]);

  const columns = [
    {
      field: "#",
      renderCell: ({ row }) =>
        generateNumber(player, row, row.id, pauseTrack, playTrack),
      width: 50,
      sortable: false,
    },
    {
      field: "Title",
      renderCell: ({ row }) => generateTitle(row),
      flex: 1,
      minWidth: 0,
      sortable: false,
    },
    {
      field: "Album",
      renderCell: ({ row }) => {
        return row.album?.name;
      },
      flex: 1,
      minWidth: 0,
      sortable: false,
    },
    {
      field: "Duration",
      renderCell: ({ row }) => generateDuration(row),
      width: 90,
      sortable: false,
    },
  ];

  return (
    <>
      {playlist.loading && pathname !== "/search" ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100px"
          height="100px"
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            mb: 2,
          }}
        />
      ) : playlist.name ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100px",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              overflow: "hidden",

              mr: 2,
            }}
          >
            <Box component="img" src={cover} sx={{ width: "100%" }} />
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "medium" }}
          >
            {name}
          </Typography>
        </Box>
      ) : null}

      <Paper sx={{ px: "24px", pt: "16px" }}>
        <DataTable
          rows={tracks}
          columns={columns}
          hideFooter
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableVirtualization
          rowHeight={60}
        />
      </Paper>
    </>
  );
}

export default Playlist;
