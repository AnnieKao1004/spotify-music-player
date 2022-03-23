import { Box } from "@mui/material";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { grey } from "@mui/material/colors";

// Generate playlist columns
export const generateNumber = (
  player = {},
  track = {},
  id = 0,
  pauseTrack = () => {},
  playTrack = () => {}
) => {
  const getControlIcon = (isCurrentTrack) => {
    if (isCurrentTrack) {
      return player.playing ? (
        <PauseCircleFilledRoundedIcon
          className={`play ${isCurrentTrack ? "current" : ""}`}
          onClick={pauseTrack}
        />
      ) : (
        <PlayCircleFilledRoundedIcon
          className={`play ${isCurrentTrack ? "current" : ""}`}
          onClick={() => playTrack(track, id)}
        />
      );
    }
    return (
      <PlayCircleFilledRoundedIcon
        className={`play ${isCurrentTrack ? "current" : ""}`}
        onClick={() => playTrack(track, id)}
      />
    );
  };

  const isCurrent = track?.preview_url === player.track?.preview_url;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& .play": {
          transition: "all 0.3s",
          "&:hover": {
            cursor: "pointer",
            color: grey[600],
          },
        },
      }}
    >
      <div
        className={`number ${isCurrent ? "current" : ""} ${
          track?.preview_url ? "" : "noPreview"
        }`}
      >
        {id}
      </div>
      {track?.preview_url && getControlIcon(isCurrent)}
    </Box>
  );
};

export const generateTitle = (track = {}) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: (theme) => theme.spacing(1),
        "& div": {
          lineHeight: "initial",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",

          "&:nth-child(2)": {
            color: grey[500],
          },
        },
      }}
    >
      <div>{track.name}</div>
      <div>
        {track.artists?.map((artist, i) => {
          if (!!i) {
            return `, ${artist.name}`;
          } else {
            return artist.name;
          }
        })}
      </div>
    </Box>
  );
};

export const generateDuration = (track = {}) => {
  const duration_s = Math.round(track.duration_ms / 1000);
  const min = Math.floor(duration_s / 60);
  let sec = duration_s % 60;
  if (`${sec}`.length < 2) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
