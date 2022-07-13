import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { spacing } from "@mui/system";
import {
  Box as MuiBox,
  Drawer as MuiDrawer,
  ListItemButton,
} from "@mui/material";
import { SidebarItemsType } from "../../types/sidebar";
import SidebarNav from "./SidebarNav";
import "./sidebar.css";
import logo from "./assets/logo.svg";

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;
  background-color: #ffffff;
  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)<{
  component?: any;
  to?: string;
}>`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

export type SidebarProps = {
  PaperProps: {
    style: {
      width: number;
    };
  };
  variant?: "permanent" | "persistent" | "temporary";
  open?: boolean;
  onClose?: () => void;
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  showFooter?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  showFooter = true,
  ...rest
}) => {
  useEffect(() => {
    var element: any = document.getElementById("root");
    if (element !== null) {
      element.style.maxWidth = "unset";
      element.style.position = "unset";
      element.style.margin = "unset";
    }
  }, []);
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand className="sidebar-head" component={NavLink} to="/">
        <Box ml={1}>
          <img src={logo} alt="logo" />
        </Box>
      </Brand>
      <SidebarNav items={items} />
    </Drawer>
  );
};

export default Sidebar;
