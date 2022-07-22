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
          backgroundColor: theme.palette.grey["900"],
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
                height: matches ? "30vh" : "60vh",
                display: "flex",
                alignItems: matches ? "flex-end" : "center",
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography
                  color="white"
                  variant="body1"
                  align={matches ? "center" : "left"}
                >
                  NPO法人 NEM技術普及推進会
                </Typography>
                <br />
                <Typography
                  color="white"
                  variant="h1"
                  fontWeight={"bold"}
                  align={matches ? "center" : "left"}
                  style={{ fontSize: "2em" }}
                >
                  NEMTUS
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
              <img src={"/vercel.svg"} height="200px" width="200px" />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="md" style={{ position: "relative", top: "-50px" }}>
        <Card
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "saturate(200%) blur(30px)",
          }}
        >
          <CardContent>
            <Typography
              color="primary"
              align="center"
              variant="h4"
              fontWeight="bold"
              textAlign="left"
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            >
              Message 1
            </Typography>
            <Container maxWidth="sm">
              <Typography align="left" style={{ paddingBottom: "50px" }}>
                message message
              </Typography>
            </Container>
          </CardContent>
          <CardContent>
            <Typography
              color="primary"
              align="center"
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            >
              What's New
            </Typography>
          </CardContent>
          <CardContent>
            <Grid container spacing={5}>
              {[
                {
                  title:
                    "「NEMTUS Hackathon Hack+2022 受賞式 in XYMCity」開催のお知らせ",
                  image: "/vercel.svg",
                  desc: "「NEMTUS Hackathon Hack+2022」のアフターイベント開催が決定したのでお知らせします。会場はオンライン、Cluster × Discordでライブ配信します！",
                },
                {
                  title:
                    "「NEMTUS Hackathon Hack+2022 受賞式 in XYMCity」開催のお知らせ",
                  image: "/vercel.svg",
                  desc: "「NEMTUS Hackathon Hack+2022」のアフターイベント開催が決定したのでお知らせします。会場はオンライン、Cluster × Discordでライブ配信します！",
                },
                {
                  title:
                    "「NEMTUS Hackathon Hack+2022 受賞式 in XYMCity」開催のお知らせ",
                  image: "/vercel.svg",
                  desc: "「NEMTUS Hackathon Hack+2022」のアフターイベント開催が決定したのでお知らせします。会場はオンライン、Cluster × Discordでライブ配信します！",
                },
                {
                  title:
                    "「NEMTUS Hackathon Hack+2022 受賞式 in XYMCity」開催のお知らせ",
                  image: "/vercel.svg",
                  desc: "「NEMTUS Hackathon Hack+2022」のアフターイベント開催が決定したのでお知らせします。会場はオンライン、Cluster × Discordでライブ配信します！",
                },
              ].map((item, index) => (
                <Grid item key={index} xs={12} sm={12} md={6}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="280"
                      image={item.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
