import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FindClinic.css';

type Clinic = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  email: string;
  contact: string;
};

const clinicsData: Clinic[] = [
  {
    id: 1,
    name: 'New York Heart Clinic',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipcode: '10001',
    email: 'info@nyheartclinic.com',
    contact: '+1-123-456-7890',
  },
  {
    id: 2,
    name: 'LA Skin Clinic',
    street: '456 Hollywood Blvd',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    zipcode: '90028',
    email: 'info@laskinclinic.com',
    contact: '+1-987-654-3210',
  },
  // Add more clinics as needed
];

const FindClinic: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const filteredClinics = clinicsData.filter((clinic) => {
    return (
      clinic.name.toLowerCase().includes(searchName.toLowerCase()) &&
      clinic.city.toLowerCase().includes(searchCity.toLowerCase())
    );
  });

  return (
    <Container className="find-clinic-container">
      <h1 className="find-clinic-header">Find a Clinic</h1>
      <Form>
        <Row className="mb-3">
          <Col lg={6}>
            <Form.Control
              type="text"
              placeholder="Search by Clinic Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Col>
          <Col lg={3}>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </Col>
          <Col className="text-left" lg={3}>
            <Button variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredClinics.map((clinic) => (
          <Col md={4} key={clinic.id} className="mb-4">
            <Card className="clinic-card">
              <Card.Body>
                <Card.Title>{clinic.name}</Card.Title>
                <Card.Text className="clinic-info">
                  <div className="clinic-info-item">
                    <strong>Location:</strong>
                    <span>
                      {clinic.street}, {clinic.city}, {clinic.state}, {clinic.country}, {clinic.zipcode}
                    </span>
                  </div>
                  <div className="clinic-info-item">
                    <strong>Email:</strong>
                    <span>{clinic.email}</span>
                  </div>
                  <div className="clinic-info-item">
                    <strong>Contact:</strong>
                    <span>{clinic.contact}</span>
                  </div>
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FindClinic;
