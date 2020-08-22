import React from "react"

import { Switch, Route, useHistory } from "react-router-dom"

import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"

import Main from "./components/Main/Main"
import Landing from "./components/Landing/Landing"
import End from "./components/End/End"
import Game from "./components/Game/Game"
import CreateGame from "./components/Game/Create"
import ListOfCommonPasswords from "./components/ListOfCommonPasswords/ListOfCommonPasswords"

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}))

function App() {
  const classes = useStyles()
  const history = useHistory()

  const sendTo = (location) => {
    history.push(location)
  }

  return (
    <>
      <AppBar color="secondary" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={() => sendTo("/")}>
              Passworks
            </Button>
          </Typography>
          <Button color="inherit" onClick={() => sendTo("/activity")}>
            Activities
          </Button>
          <Button color="inherit" onClick={() => sendTo("/common")}>
            Most Common Passwords
          </Button>
          <Button color="inherit" onClick={() => sendTo("/game")}>
            Password Games
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route
          path="/activity/:activitynum"
          render={(input) => (
            <Main
              lessonNum={input.match.params.activitynum - 1}
              // the key here forces a remount when we change the activitynum
              key={input.match.params.activitynum - 1}
            />
          )}
        />
        <Route path="/activity">
          <Main />
        </Route>
        <Route path="/end">
          <End />
        </Route>
        <Route path="/game/create">
          <CreateGame />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/common">
          <ListOfCommonPasswords />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </>
  )
}

export default App
