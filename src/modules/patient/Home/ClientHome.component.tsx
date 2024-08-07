import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStethoscope, FaUserMd, FaAmbulance, FaBaby, FaVideo, FaBrain, FaTooth, FaHome, FaCheck, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa'; // Importing react-icons
import './ClientHome.css';
import bannerImage from '../../../images/bannerClient.jpg';
import { getProfileRequest, updateProfileRequest } from '../../../store/actions/profileActions';
import { connect } from 'react-redux';

class ClientHome extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <h1>Welcome to MediManage</h1>
        </header>
        <Container>
          <section className="about-us my-5">
            <Card className="text-center p-4">
              <Card.Body>
                <Card.Title>About Us</Card.Title>
                <Card.Text>
                  At MediManage, your health is our priority. We are dedicated to providing compassionate and personalized care that meets your unique needs. Our team of healthcare professionals is committed to enhancing your well-being through innovative solutions and attentive support. We strive to make your healthcare journey seamless and effective, empowering you with the knowledge and tools you need for better health.
                </Card.Text>
              </Card.Body>
            </Card>
          </section>

          <section className="our-promises my-5">
            <h2 className="text-center mb-4">Our Promises</h2>
            <Row>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaStethoscope className="promise-icon" />
                      <Card.Title className="text-center mt-2">Personalized Care</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Routine check-ups</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Preventive care</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Management of chronic conditions</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaUserMd className="promise-icon" />
                      <Card.Title className="text-center mt-2">Specialized Expertise</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Cardiologists</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Dermatologists</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Orthopedists</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaAmbulance className="promise-icon" />
                      <Card.Title className="text-center mt-2">Emergency Care</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Treatment for acute injuries and illnesses</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Emergency medical transportation</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaBaby className="promise-icon" />
                      <Card.Title className="text-center mt-2">Maternity and Newborn Care</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Prenatal care</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Delivery services</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Postnatal care for mothers and infants</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaVideo className="promise-icon" />
                      <Card.Title className="text-center mt-2">Telehealth Services</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Virtual consultations with healthcare providers</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Remote monitoring of patient health metrics</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaBrain className="promise-icon" />
                      <Card.Title className="text-center mt-2">Mental Health Services</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Counseling</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Therapy (individual, group, family)</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Psychiatric evaluations and treatment</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item">
                      <FaTooth className="promise-icon" />
                      <Card.Title className="text-center mt-2">Dental Services</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Routine dental exams and cleanings</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Fillings, extractions, and other dental procedures</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <Card className="promise-card h-100">
                  <Card.Body>
                    <div className="promise-item text-center">
                      <FaHome className="promise-icon" />
                      <Card.Title className="text-center mt-2">Home Health Care</Card.Title>
                      <Card.Text><FaCheck className="check-icon" /> Skilled nursing care</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Medical social services</Card.Text>
                      <Card.Text><FaCheck className="check-icon" /> Home infusion therapy</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          <section className="contact-us my-5">
            <Card className="text-center p-4">
            <Card.Body>
                <Card.Title>Contact Us</Card.Title>
                <Card.Text>
                  For more information, please contact us at:
                </Card.Text>
                <Card.Text>
                  <FaEnvelope className="contact-icon" /> <strong>Email:</strong> <a href="mailto:info@medimanage.com">info@medimanage.com</a>
                </Card.Text>
                <Card.Text>
                  <FaPhone className="contact-icon" /> <strong>Phone:</strong> (123) 456-7890
                </Card.Text>
                <Card.Text>
                  <FaGlobe className="contact-icon" /> <strong>Website:</strong> <a href="https://www.medimanage.com" target="_blank" rel="noopener noreferrer">www.medimanage.com</a>
                </Card.Text>
                <Button variant="primary" href="mailto:info@medimanage.com">Email Us</Button>
              </Card.Body>
            </Card>
          </section>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  role: state?.auth?.role,
  profileData: state?.profile?.profileData
});

const mapDispatchToProps = (dispatch: any) => ({
  getProfile: () => dispatch(getProfileRequest()),
  updateProfile: (userData: any) => dispatch(updateProfileRequest(userData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ClientHome);
