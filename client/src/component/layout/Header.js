import React from "react";
import { PropTypes } from "prop-types";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormatIndentDecreaseRoundedIcon from "@mui/icons-material/FormatIndentDecreaseRounded";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useStateValue } from "../../StateProvider";
import { SET_TOKEN } from "../../reducer";
import { headerHeight } from "./style";

function Header({ setOpen = () => {} }) {
  const [_, dispatch] = useStateValue();

  const onClickLogout = () => {
    dispatch({ type: SET_TOKEN, token: "" });
    sessionStorage.removeItem("isLoggedin");
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: { md: "flex-end", xs: "space-between" },
        alignItems: "center",
        px: 3,
        height: headerHeight,
        color: "grey.50",
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        position: "sticky",
        top: 0,
        zIndex: "appBar",
      }}
    >
      <IconButton
        color="inherit"
        sx={{ display: { md: "none" } }}
        fontSize="inherit"
        onClick={() => setOpen((open) => !open)}
      >
        <FormatIndentDecreaseRoundedIcon />
      </IconButton>
      <IconButton color="inherit" fontSize="inherit" onClick={onClickLogout}>
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  );
}

Header.propTypes = { setOpen: PropTypes.func };

export default Header;
