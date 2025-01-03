import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import WcIcon from '@mui/icons-material/Wc';
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const ActorDetails = ({ actor }) => {  // Don't miss this!

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Paper component="ul" sx={{...root}}>
        <Chip icon={<CalendarIcon />} label={`${actor.birthday}`} />
        <Chip
          icon={<WcIcon />}
          label={`${actor.gender.toLocaleString() == 2 ? 'Male'
            : actor.gender.toLocaleString() == 1 ? 'Female'
            : actor.gender.toLocaleString() == 3 ? 'Non-binary' 
            : 'Not specified'}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${actor.popularity}`}
        />
        <br />
        <Chip label={`Birth place: ${actor.place_of_birth}`} />
      </Paper>
        <br />
      </>
  );
};
export default ActorDetails ;