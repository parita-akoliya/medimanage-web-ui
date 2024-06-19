import React from 'react';
import  './MainLayout.css';
import ClientHeader from '../../../shared/components/ClientHeader/ClientHeader.component';
import { Outlet } from 'react-router';

class ClientMainLayout extends React.Component {
  render() {
    return (
      <div className="App">
        <ClientHeader />
        <div>
            <Outlet/>
        </div>
      </div>
    );
  }
}

export default ClientMainLayout;
