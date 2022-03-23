import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useController from "../../hook/useController";
import { useStateValue } from "../../StateProvider";
import Playlist from "./Playlist";
import { getSpotify } from "../../utils/spotify";
import { SET_PLAYLIST } from "../../reducer";
import { generateNumber, generateTitle, generateDuration } from "./tableCells";

const ArtistTopTracks = () => {
  const [{ token }, dispatch] = useStateValue();
  const { id } = useParams();

  const fetchArtistTopTracks = useCallback(async () => {
    dispatch({
      type: SET_PLAYLIST,
      playlist: {
        loading: true,
      },
    });
    const artistInfo = await getSpotify(token, `/artists/${id}`);
    const topTracks = await getSpotify(token, `/artists/${id}/top-tracks`, {
      market: "ES",
    });

    dispatch({
      type: SET_PLAYLIST,
      playlist: {
        loading: false,
        name: artistInfo.name,
        cover: artistInfo.images?.[0].url,
        tracks: topTracks.tracks.map((track, index) => ({
          ...track,
          id: index + 1,
        })),
      },
    });
  }, [token, id, dispatch]);

  return <Playlist fetchTracks={fetchArtistTopTracks} />;
};

ArtistTopTracks.propTypes = {};

export default ArtistTopTracks;
