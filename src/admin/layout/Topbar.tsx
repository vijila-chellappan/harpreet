import { AppBar, Toolbar, Typography } from "@mui/material";

const Topbar = () => {
  return (
    <AppBar position="static" sx={{ background: "#fff", color: "#000" }}>
      <Toolbar>
        <Typography variant="h6">Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;