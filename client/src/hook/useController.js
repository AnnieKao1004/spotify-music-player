import { useEffect } from "react";
import { SET_PLAYER, SET_VOLUME } from "../reducer";

function useController(player, dispatch) {
  const pauseTrack = () => {
    dispatch({
      type: SET_PLAYER,
      player: { playing: false },
    });
  };

  const playTrack = (track = player.track, id = player.id) => {
    const newUrl = track.preview_url;
    const currentUrl = player.audioElement?.src;

    // play another track
    if (player.playing && newUrl !== currentUrl) {
      player.audioElement.pause();
      dispatch({
        type: SET_PLAYER,
        player: {
          track,
          id,
          audioElement: new Audio(newUrl),
        },
      });
      // continue to play the same track
    } else if (!player.playing && newUrl === currentUrl) {
      dispatch({
        type: SET_PLAYER,
        player: {
          playing: true,
        },
      });
      // start to play
    } else {
      dispatch({
        type: SET_PLAYER,
        player: {
          playing: true,
          track,
          id,
          audioElement: new Audio(newUrl),
        },
      });
    }
  };

  const changeVolume = (volume) => {
    dispatch({
      type: SET_VOLUME,
      volume,
    });
  };

  useEffect(() => {
    if (player.audioElement) {
      if (player.playing) {
        player.audioElement.volume = player.volume;
        player.audioElement.play();
      } else if (!player.playing) {
        player.audioElement.pause();
      }
    }
  }, [dispatch, player.playing, player.volume, player.audioElement]);

  return [pauseTrack, playTrack, changeVolume];
}

export default useController;
