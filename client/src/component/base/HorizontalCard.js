import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useStateValue } from "../../StateProvider";
import { hoverableCard } from "./style";

import defaultImg from "../../img/panorama.svg";

const height = 104;

function HorizontalCard({ loading = true, data = {} }) {
  const navigate = useNavigate();
  const [_, dispatch] = useStateValue();
  const [imageLoaded, setImageLoaded] = useState(false);

  const onPlayListClick = async () => {
    navigate(`/playlist/${data.id}`);
  };

  return (
    <Card sx={hoverableCard}>
      {loading ? (
        <Skeleton animation="wave" variant="rectangular" height={height} />
      ) : (
        <CardActionArea onClick={onPlayListClick}>
          <Box sx={{ display: "flex", height: `${height}px` }}>
            <Box
              sx={{
                width: `${height}px`,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "60%",
                  display: imageLoaded ? "none" : "block",
                }}
                src={defaultImg} // show default image before image is loaded
                alt={data.name}
              />

              <CardMedia
                component="img"
                sx={{
                  width: `${height}px`,
                  display: imageLoaded ? "block" : "none",
                }}
                src={data.images[0].url}
                alt={data.name}
                onLoad={() => setImageLoaded(true)}
              />
            </Box>

            <CardContent>
              <Typography
                component="div"
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {data.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {data.description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      )}
    </Card>
  );
}

HorizontalCard.propTypes = { loading: PropTypes.bool, data: PropTypes.object };

export default HorizontalCard;
