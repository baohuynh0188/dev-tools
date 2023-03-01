import React from 'react';
import { Route, Routes } from 'react-router-dom';
import router from './router';

const App = (): JSX.Element => {
  return (
    <Routes>
      {router.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
