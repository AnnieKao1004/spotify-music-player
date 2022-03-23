import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import logo from "../../img/Spotify_Logo_Black.png";
import background from "../../img/login_bg.jpg";

export default function Login() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ height: "300px" }}>
        <Box
          component="img"
          src={logo}
          sx={{ width: "auto", height: "150px" }}
        ></Box>
      </Box>

      <Button
        href={`/login`}
        size="large"
        variant="contained"
        sx={{
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "fontWeightMedium",
          backgroundColor: grey["600"],
          "&:hover": {
            backgroundColor: grey["700"],
          },
        }}
      >
        Login with Spotify
      </Button>
    </Box>
  );
}
