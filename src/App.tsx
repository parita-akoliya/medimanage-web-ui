import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          {routes.map((route, i) => (
            <Route data-testid={route.path} path={route.path} element={route.element}>
              {route.children && route.children.map((childRoute, j) => (
                <Route data-testid={route.path} key={j} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;