import React from "react"
import Layout from "./Layout"

import Main from "./components/Main/Main"
import Landing from "./components/Landing/Landing"
import End from "./components/End/End"

function App() {
  return (
    <Layout>
      <Landing />
      <Main />
      <End />
    </Layout>
  )
}

export default App
