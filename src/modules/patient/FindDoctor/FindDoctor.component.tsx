import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FindDoctor.css';
import doctor1 from '../../../images/doctor1.png';
import doctor2 from '../../../images/doctor2.png';


type Doctor = {
  id: number;
  image: string;
  name: string;
  speciality: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  clinic: string;
};

const doctorsData: Doctor[] = [
  {
    id: 1,
    image: doctor1,
    name: 'Dr. John Doe',
    speciality: 'Cardiologist',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipcode: '10001',
    clinic: 'New York Heart Clinic',
  },
  {
    id: 2,
    image: doctor2,
    name: 'Dr. Jane Smith',
    speciality: 'Dermatologist',
    street: '456 Hollywood Blvd',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    zipcode: '90028',
    clinic: 'LA Skin Clinic',
  },
  // Add more doctors as needed
];

const FindDoctor: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();
  const navigationToProfile = (data:any) => {
    console.log(data);
    navigate(`/client/doctor-clinic-info/${data.id}`, { state: { data } });
    // this.setState({ showModal: true, selectedUser: user, role: user?.role || '', editMode: null });
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      doctor.city.toLowerCase().includes(searchCity.toLowerCase())
    );
  });



  return (
    <Container className="find-doctor-container">
      <h1 className="find-doctor-header">Find a Doctor</h1>
      <Form>
        <Row className="mb-3">
          <Col lg={6}>
            <Form.Control
              type="text"
              placeholder="Search by Doctor Name or Speciality"
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
        {filteredDoctors.map((doctor) => (
          <Col md={4} key={doctor.id} className="mb-4">
            <Card className="doctor-card">
              <div className="doctor-image-wrapper">
                <Card.Img variant="top" src={doctor.image} className="doctor-image" />
              </div>
              <Card.Body>
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Text className="doctor-info">
                  <div className="doctor-info-item">
                    <strong>Speciality:</strong>
                    <span>{doctor.speciality}</span>
                  </div>
                  <div className="doctor-info-item">
                    <strong>Clinic:</strong>
                    <span>{doctor.clinic}</span>
                  </div>
                  <div className="doctor-info-item">
                    <strong>Location:</strong>
                    <span>{doctor.street}, {doctor.city}, {doctor.state}, {doctor.country}, {doctor.zipcode}</span>
                  </div>
                </Card.Text>
                <Button variant="primary" onClick={() => navigationToProfile(doctor)}>View Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FindDoctor;
