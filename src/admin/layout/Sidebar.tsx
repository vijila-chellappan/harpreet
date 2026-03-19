import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          background: "#111827",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6">Admin Panel</Typography>
      </Toolbar>

      <List>
        <ListItemButton component={Link} to="/admin/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/contacts">
          <ListItemText primary="Contacts" />
        </ListItemButton>
         <ListItemButton component={Link} to="/admin/blogs">
          <ListItemText primary="Blogs" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;