import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  return isLoading ? (
    <div className="loading-spinner-overlay">
      <Spinner style={{width:'5em', height:'5em'}}animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ): null;
};

export default LoadingSpinner;
