import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./layout";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Container component={"main"}>
          <Outlet />
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
