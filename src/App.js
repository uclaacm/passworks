import React from 'react';
import Layout from './Layout.js';

import Main from './components/Main/Main.js';
import Landing from './components/Landing/Landing.js';

function App() {
  return (
    <Layout>
      <Landing />
      <Main />
    </Layout>
  );
}

export default App;
