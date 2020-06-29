import React from "react"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import FavoriteIcon from "@material-ui/icons/Favorite"
import GitHubIcon from "@material-ui/icons/GitHub"

import { Box } from "@material-ui/core"
import { ReactComponent as CommonImg } from "./common.svg"
import { ReactComponent as LengthImg } from "./length.svg"
import { ReactComponent as SpiceImg } from "./spice.svg"
import { ReactComponent as PersonalImg } from "./personal.svg"

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.5rem",
    padding: "10px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "1.3rem",
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    padding: "10px 0px 5px",
  },
}))

const cards = [
  {
    title: `Go Long`,
    description: `Make sure your passwords aren’t too short`,
    img: <LengthImg width="90%" height="90%" style={{ padding: "10px" }} />,
  },
  {
    title: `Don’t be Basic`,
    description: `Avoid using common or easy-to-guess passwords`,
    img: <CommonImg width="90%" height="90%" style={{ padding: "10px" }} />,
  },
  {
    title: `Spice it Up`,
    description: `Include a variety of characters in your passwords`,
    img: <SpiceImg width="90%" height="90%" style={{ padding: "10px" }} />,
  },
  {
    title: `Be Cautious`,
    description: `Always be alert when sharing your personal information with others`,
    img: <PersonalImg width="90%" height="90%" style={{ padding: "10px" }} />,
  },
]

export default function End() {
  const classes = useStyles()

  const cardItems = cards.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={3} key={item.description}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          borderRadius="7px"
          border="2px solid black"
        >
          <Typography className={classes.subtitle}>{item.title}</Typography>
          <div>{item.img}</div>
          <Typography
            style={{
              padding: "5px 10px 10px",
              wordWrap: "break-word",
              textAlign: "center",
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Grid>
    )
  })

  return (
    <Container maxWidth="lg" id="EndSection">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div>
            <Typography className={classes.header}>
              To recap, you’ve learned four important things about password
              security:
            </Typography>
            <Grid container spacing={2}>
              {cardItems}
            </Grid>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "20px",
              }}
            >
              Remember these tips when creating your own passwords! However, you
              should also try to make your passwords memorable. You can still
              use words, but capitalize some letters and put numbers and symbols
              between them. For example, instead of using redcherries2015, you
              could try something like chErr20iesRE?D
            </Typography>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "20px",
              }}
            >
              If you want to get more advanced, try using a password manager!
            </Typography>
            <Typography style={{ paddingTop: "20px", textAlign: "center" }}>
              made with{" "}
              <FavoriteIcon
                style={{
                  fontSize: "1.2em",
                  color: "red",
                  verticalAlign: "top",
                }}
              />{" "}
              by{" "}
              <a
                href="https://teachla.uclaacm.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACM Teach LA
              </a>
              ’s dev team{" "}
              <a
                href="https://github.com/uclaacm/passworks"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <GitHubIcon
                  style={{ fontSize: "1.2em", verticalAlign: "top" }}
                />{" "}
              </a>
            </Typography>
          </div>
        </div>
      </section>
    </Container>
  )
}
