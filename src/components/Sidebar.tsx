import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Folder,
  ExpandMore,
  ExpandLess,
  Logout,
  Home,
} from '@mui/icons-material';
import { User } from '../models/User';
import { IUserLogin } from '../types/user.types';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  subitems?: Array<{
    label: string;
    path: string;
  }>;
}

interface SidebarProps {
  user: IUserLogin | null; // Accept the User or null if not authenticated
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    icon: <Home className="text-white" />,

    path: '/home',
  },
];

function Sidebar({ user, setIsAuthenticated }: SidebarProps) {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  function handleItemClick(item: NavigationItem) {
    if (item.subitems) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else {
      if (item.path === '/home') {
        navigate(item.path, { state: { user } }); // Pass user data as state
      } else {
        navigate(item.path);
      }
    }
  }

  function handleSubItemClick(path: string) {
    navigate(path);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <Box className="w-64 h-screen bg-foreground text-white flex flex-col min-w-64">
      <Box className="p-5 border-b border-gray-700">
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Workspacename
        </Typography>
      </Box>

      <List className="flex-1 py-2">
        {navigationItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem
              className="p-2 hover:bg-gray-500 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <ListItemIcon className="min-w-10 text-white">
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <span className="text-sm font-normal">{item.label}</span>
                }
              />
              {item.subitems &&
                (expandedItem === item.label ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>

            {item.subitems && (
              <Collapse
                in={expandedItem === item.label}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  {item.subitems.map((subitem) => (
                    <ListItem
                      key={subitem.label}
                      className="pl-8 py-2 cursor-pointer"
                      onClick={() => handleSubItemClick(subitem.path)}
                    >
                      <ListItemText primary={subitem.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <ListItem
        className="border-t border-gray-700 mt-auto cursor-pointer"
        onClick={handleLogout}
      >
        <ListItemIcon>
          <Logout className="text-white" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );
}

export default Sidebar;
