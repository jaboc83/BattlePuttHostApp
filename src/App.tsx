import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './layout';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
        component={'main'}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
