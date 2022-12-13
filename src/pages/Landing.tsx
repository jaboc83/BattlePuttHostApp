import * as React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generateNewCode } from "../codeGenerator";

const Landing = () => {
  const [existingSelected, setExistingSelected] = React.useState(false);
  const [code, setCode] = React.useState<string | undefined>();
  const navigate = useNavigate();
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom textAlign={"center"}>
        Start a new Battle Putt lobby below or enter your code to re-join an
        existing battle.
      </Typography>
      {existingSelected ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <TextField
            margin="normal"
            id="battleCode"
            label="Battle Code"
            name="battleCode"
            sx={{ width: "8rem" }}
            inputProps={{ maxLength: 6 }}
            onChange={(event) => {
              setCode(event.target.value?.toUpperCase());
            }}
          ></TextField>
          <Button
            variant="contained"
            sx={{ height: "4rem", width: "8rem" }}
            onClick={() => {
              navigate(`/battle/${code}`);
            }}
            disabled={code === undefined}
          >
            Join
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            sx={{ height: "4rem", width: "12rem" }}
            onClick={() => {
              navigate(`/battle/${generateNewCode(8)}`);
            }}
          >
            Start a new Battle
          </Button>
          <Button
            variant="contained"
            sx={{ height: "4rem", width: "15rem" }}
            onClick={() => {
              setExistingSelected(true);
            }}
          >
            Join an existing Battle
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default Landing;
