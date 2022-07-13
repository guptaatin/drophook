import React, { useState } from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";

import { Box, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import dashboardItems from "../components/sidebar/dashboardItems";
import dashboardItemsVendor from "../components/sidebar/dashboardItemsVendor";
import dashboardItemsVendorManager from "../components/sidebar/dashboardItemsVendorManager";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";
// import Settings from "../components/Settings";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard: React.FC = ({ children }: any) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  var role = localStorage.getItem("role");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={dashboardItems}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {role === "ROLE_ADMINISTRATOR" ||
          role === "ROLE_SUPER ADMINISTRATOR" ? (
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              items={dashboardItems}
            />
          ) : role === "ROLE_VENDOR MANAGER" ? (
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              items={dashboardItemsVendorManager}
            />
          ) : (
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              items={dashboardItemsVendor}
            />
          )}
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent
          p={isLgUp ? 12 : 5}
          style={{ position: "relative" }}
          className="db-clmn"
        >
          {children}
          <Outlet />
        </MainContent>
        <Footer />
      </AppContent>
      {/* <Settings /> */}
    </Root>
  );
};

export default Dashboard;
