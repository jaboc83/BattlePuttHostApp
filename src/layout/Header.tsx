import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => (
  <Box component={"header"}>
    <Link
      component={RouterLink}
      to="/start"
      sx={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Typography
        variant="h1"
        component={"h1"}
        sx={{ fontWeight: 500 }}
        align="center"
        color={"secondary"}
      >
        Battle Putt
      </Typography>
    </Link>
  </Box>
);

export default Header;
