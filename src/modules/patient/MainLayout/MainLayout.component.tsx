import React from 'react';
import { Outlet } from 'react-router';
import ClientHeader from '../../../shared/components/ClientHeader/ClientHeader.component';
import  './MainLayout.css';


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
