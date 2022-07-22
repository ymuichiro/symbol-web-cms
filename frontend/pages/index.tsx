import type { NextPage } from "next";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/moleculs/Header";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

const Home: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: "url('/assets/img/header-background.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          WebkitMaskImage:
            "linear-gradient(rgb(0,0,0),rgb(0,0,0),rgb(0,0,0),rgba(0,0,0,0))",
        }}
      >
        <Toolbar />
        <Container maxWidth="md" style={{ height: "100%" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                height: matches ? "30vh" : "70vh",
                display: "flex",
                alignItems: matches ? "flex-end" : "center",
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography
                  color="white"
                  variant="h1"
                  fontWeight={"bold"}
                  align={matches ? "center" : "left"}
                  style={{ fontSize: "2em" }}
                >
                  Welcom to Symbol & NEM
                </Typography>
                <br />
                <Typography
                  color="white"
                  variant="body1"
                  fontWeight={"bold"}
                  align={matches ? "center" : "left"}
                >
                  個人に力を与える、Symbolブロックチェーン
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "50px",
                paddingBottom: "100px",
              }}
            >
              <img
                src={"/assets/img/symbol-logo-white.png"}
                height="200px"
                width="200px"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="md">{/* contents */}</Container>
    </div>
  );
};

export default Home;
