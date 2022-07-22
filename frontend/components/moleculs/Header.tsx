import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import SymbolLogo from "../../public/assets/img/symbol-logo-with-dark-text.png";

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Container
          maxWidth="md"
          style={{
            position: "absolute",
          }}
        >
          <AppBar
            position="absolute"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              color: theme.palette.text.primary,
              borderRadius: "10px",
              width: "calc(100% - 48px)",
              left: 0,
              right: 0,
              margin: "auto",
            }}
          >
            <Toolbar>
              <div style={{ flexGrow: 1 }}>
                <Image
                  src={SymbolLogo}
                  height={35}
                  width={155}
                  alt="Symbol-Logo"
                />
              </div>
              {matches || (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "20px",
                    marginRight: "40px",
                  }}
                >
                  <Button
                    variant="text"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    TOP
                  </Button>
                  <Button
                    variant="text"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    NEWS
                  </Button>
                  <Button
                    variant="text"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Community
                  </Button>
                  <Button
                    variant="text"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Docs
                  </Button>
                </div>
              )}

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Container>
      </div>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(!open)}>
        <List>
          {["Home", "News", "Community", "Documents"].map((item, index) => (
            <ListItemButton
              key={index}
              divider
              style={{ width: "70vh", maxWidth: "300px" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
