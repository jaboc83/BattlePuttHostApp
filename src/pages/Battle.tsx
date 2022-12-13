import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const games = [
  {
    id: "91f6d41f-9f14-4f4a-8367-5e3097c80cb8",
    name: "Knockout",
    maxNumberOfPlayers: 10,
    minNumberOfPlayers: 1,
    allowTeams: false
  },
  {
    id: "bd4323cf-a613-4d2a-984f-3bd6a8f1d81d",
    name: "Putt 360",
    maxNumberOfPlayers: 10,
    minNumberOfPlayers: 1,
    allowTeams: false
  }
];
const Battle = () => {
  // Get url params
  const { battleId } = useParams();
  return (
    <Box>
      <Typography>
        Welcome to lobby {battleId}, select a game below to start a new game.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {games.map((game) => (
          <Button variant="contained" sx={{ height: "4rem", width: "8rem" }}>
            {game.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Battle;
