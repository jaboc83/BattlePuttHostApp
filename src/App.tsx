import * as React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from "@mui/material";
import { Footer, Header } from "./layout";

function App() {
  const [existingSelected, setExistingSelected] = React.useState(false);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Container component={"main"}>
          <Box sx={{ my: 4 }}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textAlign={"center"}
            >
              Start a new Battle Putt lobby below or enter your code to re-join
              an existing battle.
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
                ></TextField>
                <Button
                  variant="contained"
                  sx={{ height: "3rem", width: "8rem" }}
                >
                  Join
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="contained"
                  sx={{ height: "5rem", width: "15rem" }}
                >
                  Start a new Battle
                </Button>
                <Button
                  variant="contained"
                  sx={{ height: "5rem", width: "15rem" }}
                  onClick={() => {
                    setExistingSelected(true);
                  }}
                >
                  Re-join an exising Battle
                </Button>
              </Box>
            )}
          </Box>
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
