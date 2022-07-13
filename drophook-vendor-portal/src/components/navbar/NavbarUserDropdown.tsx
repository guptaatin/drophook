import * as React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
    navigate("/pages/profile");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    navigate(0)
    // localStorage.removeItem("userSignInEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("user_last_name");
    localStorage.removeItem("companyName");
    localStorage.removeItem("userid");
    localStorage.removeItem("user_first_name");
    localStorage.removeItem("emailOnboard");
    localStorage.removeItem("userinvendorid");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("forgot-password");
    localStorage.removeItem("signup-option");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
