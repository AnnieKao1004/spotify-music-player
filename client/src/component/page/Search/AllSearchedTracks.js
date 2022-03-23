import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStateValue } from "../../../StateProvider";
import useController from "../../../hook/useController";
import Playlist from "../Playlist";
import { generateNumber, generateTitle, generateDuration } from "../tableCells";
import { SET_PLAYLIST } from "../../../reducer";

const AllSearchedTracks = ({ data, setShowAllSearchedTracks }) => {
  const [{ player }, dispatch] = useStateValue();
  const [pauseTrack, playTrack] = useController(player, dispatch);

  useEffect(() => {
    dispatch({
      type: SET_PLAYLIST,
      playlist: {
        tracks: data.items.map((item, index) => ({ ...item, id: index + 1 })),
      },
    });
  }, [dispatch, data.items]);

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
      <IconButton
        color="primary"
        aria-label="back"
        component="div"
        sx={{ width: "fit-content" }}
      >
        <ArrowBackIcon onClick={() => setShowAllSearchedTracks(false)} />
      </IconButton>
      <Playlist fetchTracks={() => {}} customColumns={columns} />
    </>
  );
};

AllSearchedTracks.propTypes = {};

export default AllSearchedTracks;
