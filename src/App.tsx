import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './Routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}>
            {route.children && route.children.map((childRoute, j) => (
              <Route key={j} path={childRoute.path} element={childRoute.element} />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default App;
