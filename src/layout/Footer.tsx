import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      component={"footer"}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © Jake Moening "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Footer;
