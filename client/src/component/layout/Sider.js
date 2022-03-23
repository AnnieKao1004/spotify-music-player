import React, { useState, useEffect, useCallback } from "react";
import { PropTypes } from "prop-types";
import { Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Chip from "@mui/material/Chip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../img/Spotify_Logo_Black.png";
import { goToPlaylist } from "../../utils/general";
import { useStateValue } from "../../StateProvider";
import { SET_CURRENT } from "../../reducer";
import { getSpotify } from "../../utils/spotify";
import { drawerWidth, footerHeight, headerHeight } from "./style";

const options = [
  { name: "Home", Icon: HomeRoundedIcon, path: "home" },
  { name: "Search", Icon: ManageSearchRoundedIcon, path: "search" },
  // { name: "Create Playlist", Icon: AddBoxRoundedIcon },
];

function Sider({ open = false, setOpen = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ current, token }, dispatch] = useStateValue();

  const handleClick = (e, name, path) => {
    if (path) {
      navigate(path);
    }
  };

  useEffect(() => {
    options.forEach(({ name, path }) => {
      if (
        location.pathname === `/${path}` ||
        location.pathname.split("/")[1] === path
      ) {
        dispatch({ type: SET_CURRENT, key: name });
      }
    });
  }, [dispatch, location.pathname]);

  const handlePlaylistClick = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
    dispatch({ type: SET_CURRENT, key: "Playlist" });
  };

  const [myPlaylist, setMyPlaylist] = useState([]);

  const fetchMyPlaylist = useCallback(async () => {
    if (token) {
      const respJson = await getSpotify(token, "/me/playlists");
      setMyPlaylist(respJson?.items);
    }
  }, [token]);

  useEffect(() => {
    fetchMyPlaylist();
  }, [fetchMyPlaylist]);

  const drawerStyle = {
    width: `${drawerWidth}px`,
    backgroundColor: "#ffffff",
    position: "fixed",
    top: `${headerHeight}px`,

    "& .MuiDrawer-paper": {
      position: "static",
      width: `${drawerWidth}px`,
      boxSizing: "border-box",
      borderRight: 0,
    },
  };

  const siderMenu = (
    <>
      <List
        sx={{
          "& .MuiTypography-root": {
            color: "text.primary",
          },
        }}
      >
        {options.map(({ name, Icon, path }, index) => (
          <ListItem
            button
            key={name}
            selected={current === name}
            onClick={(e) => handleClick(e, name, path)}
            sx={{
              "&.Mui-selected": {
                color: "primary.dark",
                backgroundColor: "rgba(98, 150, 119, 0.18)",

                "&:hover": {
                  backgroundColor: "rgba(98, 150, 119, 0.18)",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: (theme) => theme.spacing(5),
              }}
            >
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                "& .MuiTypography-root": {
                  color: "inherit",
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box
        sx={{
          px: 2,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          rowGap: (theme) => theme.spacing(1),
        }}
      >
        {myPlaylist.map((item) => (
          <Chip
            key={item.name}
            sx={{
              width: "fit-content",
              maxWidth: "100%",
              px: 1,
              "& .MuiChip-icon": {
                ml: 0,
              },
              "& .MuiChip-label": {
                pl: 1,
                pr: 0.5,
              },
            }}
            icon={<MusicNoteRoundedIcon sx={{ fontSize: "16px" }} />}
            color="primary"
            label={item.name}
            onClick={() => handlePlaylistClick(item)}
          />
        ))}
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(!open)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          ...drawerStyle,
          top: 0,
          bottom: 0,
          display: { sm: "block", md: "none" },
        }}
      >
        {siderMenu}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          ...drawerStyle,
          display: { xs: "none", sm: "none", md: "block" },
          height: `calc(100vh - ${headerHeight + footerHeight}px)`,
        }}
        open
      >
        {siderMenu}
      </Drawer>
    </Box>
  );
}

Sider.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Sider;
