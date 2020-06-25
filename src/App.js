import React from 'react';
import Layout from './Layout.js';

import Main from './components/Main/Main.js';
import Landing from './components/Landing/Landing.js';
import End from './components/End/End.js';

function App() {
  return (
    <Layout>
      <Landing />
      <Main />
      <End />
    </Layout>
  );
}

export default App;
