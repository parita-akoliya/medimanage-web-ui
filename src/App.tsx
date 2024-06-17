import React from 'react';
import { BrowserRouter as Router, Routes, Route, RouteObject } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './Routes';

// Recursive function to render nested routes
const renderRoutes = (routes: RouteObject[]): JSX.Element[] => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const App: React.FC = () => {
  return (
    <div data-testid="app">
      <ToastContainer
        data-testid="toast"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </Router>
    </div>
  );
};

export default App;