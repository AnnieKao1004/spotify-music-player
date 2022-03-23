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

function VerticalCard({ loading = false, data = {} }) {
  let navigate = useNavigate();
  const [_, dispatch] = useStateValue();
  const [imageLoaded, setImageLoaded] = useState(false);

  const onCardClick = async () => {
    if (data.type === "playlist") {
      navigate(`/playlist/${data.id}`);
    } else if (data.type === "artist") {
      navigate(`/artist/${data.id}`);
    }
  };

  return (
    <Card sx={hoverableCard}>
      {loading ? (
        <Skeleton animation="wave" variant="rectangular" height={263} />
      ) : (
        <CardActionArea onClick={onCardClick}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ pt: 3, px: 2, borderRadius: "12px" }}>
              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "50%",
                    margin: "0 auto",
                    display: imageLoaded ? "none" : "block",
                  }}
                  src={defaultImg} // show default image before image is loaded
                  alt={data.name}
                />
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    display: imageLoaded ? "block" : "none",
                  }}
                  src={data.images[0]?.url}
                  alt={data.name}
                  onLoad={() => setImageLoaded(true)}
                />
              </Box>
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
                {data.description || data.name}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      )}
    </Card>
  );
}

VerticalCard.propTypes = { loading: PropTypes.bool, data: PropTypes.object };

export default VerticalCard;
