import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Slider,
  Tooltip,
  Typography,
  LinearProgress,
} from "@mui/material";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import { useStateValue } from "../../StateProvider";
import useController from "../../hook/useController";
import { footerHeight } from "./style";
import { defaultVolume } from "../../contants/controller";
import { SET_DURATION, SET_PLAYER } from "../../reducer";

const trackControllerIcon = {
  color: "primary.main",
  cursor: "pointer",
};

const getIconStatus = (enabled) => {
  if (enabled) {
    return {
      ":hover": { transform: "scale(1.2)" },
      transition: "all 0.3s !important",
    };
  } else {
    return {
      opacity: 0.38,
      ":hover": {},
      cursor: "auto",
    };
  }
};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function Footer() {
  const [{ player, playlist }, dispatch] = useStateValue();
  const { tracks } = playlist;
  const [pauseTrack, playTrack, changeVolume] = useController(player, dispatch);

  const { track } = player;

  const isFirstTrack = tracks.length && player.id === 1;
  const isLastTrack = tracks.length && player.id + 1 > tracks.length;

  const playPrevious = () => {
    if (!isFirstTrack) {
      const newId = player.id - 1;
      playTrack(tracks[newId - 1], newId);
    }
  };

  const playNext = () => {
    if (!isLastTrack) {
      const newId = player.id + 1;
      playTrack(tracks[newId - 1], newId);
    }
  };

  useEffect(() => {
    if (player.audioElement) {
      player.audioElement.onended = function () {
        dispatch({
          type: SET_PLAYER,
          player: {
            playing: false,
            audioElement: new Audio(player.track.preview_url),
          },
        });
      };
    }
  }, [dispatch, player.id, player.audioElement, player.track.preview_url]);

  const timer = useRef(null);
  const alreadySetTimer = useRef(false);
  useEffect(() => {
    if (player.playing) {
      const setTimer = () => {
        alreadySetTimer.current = true;
        timer.current = setInterval(() => {
          dispatch({
            type: SET_DURATION,
            duration: player.audioElement?.duration,
          });
        }, 200);
      };

      if (!alreadySetTimer.current) {
        setTimer();
      }
    } else if (!player.playing && player.id) {
      clearInterval(timer.current);
      alreadySetTimer.current = false;
    }
  }, [player.id, player.playing, dispatch, player.audioElement?.duration]);

  const foramtTime = (time) => {
    if (time) {
      const roundedTime = Math.round(time);
      const minute = Math.floor(roundedTime / 60);
      const second = roundedTime % 60;
      return `${minute > 9 ? minute : `0${minute}`}:${
        second > 9 ? second : `0${second}`
      }`;
    }
    return "00:00";
  };

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        columnGap: "8px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        width: "100%",
        height: `${footerHeight}px`,
        color: "text.primary",
        borderTop: "1px solid #dae7e3",
        position: "fixed",
        bottom: 0,
        zIndex: "appBar",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          flexBasis: "30%",
          maxWidth: "30%",
          display: "flex",
          height: "100%",
          columnGap: "16px",
        }}
      >
        <Box
          component="img"
          src={track.album?.images?.[0].url}
          sx={{ height: "100%", borderRadius: 1 }}
        />

        <Box
          sx={{
            maxWidth: "calc(100% - 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "8px",
          }}
        >
          <Tooltip title={track.name || ""} placement="top-start" arrow>
            <Box
              sx={{
                fontWeight: "fontWeightMedium",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {track.name}
            </Box>
          </Tooltip>
          <Box>{track.artists?.[0].name}</Box>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "16px",
          }}
        >
          <SkipPreviousRoundedIcon
            sx={{
              ...trackControllerIcon,
              ...getIconStatus(player.id && !isFirstTrack),
            }}
            onClick={playPrevious}
          />
          {player.playing ? (
            <PauseCircleFilledRoundedIcon
              fontSize="large"
              sx={{
                ...trackControllerIcon,
                ...getIconStatus(true),
              }}
              onClick={pauseTrack}
            />
          ) : (
            <PlayCircleFilledRoundedIcon
              fontSize="large"
              sx={{
                ...trackControllerIcon,
                ...getIconStatus(player.audioElement),
              }}
              onClick={() => playTrack()}
            />
          )}
          <SkipNextRoundedIcon
            sx={{
              ...trackControllerIcon,
              ...getIconStatus(player.id && !isLastTrack),
            }}
            onClick={playNext}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={
            player.audioElement
              ? (player.audioElement?.currentTime /
                  player.audioElement?.duration) *
                100
              : 0
          }
          sx={{ width: "100%", mt: 1 }}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TinyText>{foramtTime(player.audioElement?.currentTime)}</TinyText>
          <TinyText>{foramtTime(player.duration)}</TinyText>
        </Box>
      </Box>

      <Box
        sx={{
          flexBasis: "30%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <VolumeDownRounded sx={{ color: "primary.main", opacity: 0.38 }} />
        <Slider
          aria-label="Volume"
          defaultValue={defaultVolume * 100}
          onChangeCommitted={(e, value) => changeVolume(value / 100)}
          sx={{
            width: "85px",
            mx: 1,
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              "&:before": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
        />
        <VolumeUpRoundedIcon sx={{ color: "primary.main", opacity: 0.38 }} />
      </Box>
    </Box>
  );
}

export default Footer;
