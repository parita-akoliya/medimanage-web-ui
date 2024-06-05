import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
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
            <Route key={i} path={route.path} element={route.element}>
              {route.children && route.children.map((childRoute, j) => (
                <Route key={j} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;