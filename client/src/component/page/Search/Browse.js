import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Browse = ({ data = [] }) => {
  const navigate = useNavigate();

  const onCategoryClick = (id) => {
    navigate(id);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        columnGap: "24px",
        rowGap: "24px",
      }}
    >
      {data.map((item) => {
        const { name, id } = item;
        const src = item.icons[0].url;

        return (
          <Box
            key={id}
            onClick={() => onCategoryClick(id)}
            sx={{
              lineHeight: 0,
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",

              // gradient cover
              "::before": {
                content: '""',
                background:
                  "linear-gradient(to bottom,	rgba(0,0,0,0) 0%,	rgba(0,0,0,0.7) 100%)",
                width: "100%",
                height: "50%",
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 2,
                opacity: 0,
                transition: "all 0.3s",
              },

              ":hover": {
                cursor: "pointer",
                "::before": {
                  top: "50%",
                  opacity: 1,
                },

                ".title": {
                  bottom: 0,
                },
              },
            }}
          >
            <Box
              component="img"
              src={src}
              alt={name}
              sx={{ width: "100%", aspectRatio: "1/1" }}
            />
            <Box
              className="title"
              sx={{
                width: "100%",
                lineHeight: "normal",
                textAlign: "center",
                position: "absolute",
                bottom: "-100px",
                left: 0,
                zIndex: 3,
                transition: "all 0.3s",
                color: "common.white",
                pb: 1,
              }}
            >
              {name}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

Browse.propTypes = { data: PropTypes.array };

export default Browse;
