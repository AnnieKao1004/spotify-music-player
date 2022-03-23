import React, { useState } from "react";
import { Box } from "@mui/material";
import Sider from "./Sider";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { headerHeight, footerHeight } from "./style";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      <Box
        component="section"
        sx={{
          display: "flex",
          flexGrow: 1,
          marginBottom: `${footerHeight}px`,
          minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
        }}
      >
        <Sider open={open} setOpen={setOpen} />
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Content />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default Layout;
