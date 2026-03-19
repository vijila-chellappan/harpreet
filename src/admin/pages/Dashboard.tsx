import { Grid, Paper, Typography } from "@mui/material";


const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Total Contacts</Typography>
            <Typography variant="h4">25</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Total Services</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;