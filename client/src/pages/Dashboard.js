import React from "react";
import { Grid } from "semantic-ui-react";
import Users from "../components/Users/Users";
const Dashboard = () => {
  return (
    <>
      <Grid columns={2} padded="horizontally">
        <Grid.Column>
          <Users />
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </>
  );
};

export default Dashboard;
