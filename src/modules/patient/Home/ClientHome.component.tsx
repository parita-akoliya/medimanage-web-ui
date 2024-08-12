import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStethoscope, FaUserMd, FaAmbulance, FaBaby, FaVideo, FaBrain, FaTooth, FaHome, FaCheck, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import Slider from 'react-slick';
import './ClientHome.css';
import bannerImage from '../../../images/bannerClient.jpg';
import { getProfileRequest, updateProfileRequest } from '../../../store/actions/profileActions';
import { connect } from 'react-redux';

class ClientHome extends Component {
  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <div className="client-home">
        <header className="client-home-header">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <h1 className="header-title">Welcome to MediManage</h1>
        </header>

        <Container>
          <section className="about-us my-5">
            <Card className="text-center p-4 about-us-card">
              <Card.Body>
                <Card.Title className="section-title">About Us</Card.Title>
                <Card.Text className="section-text">
                  At MediManage, your health is our priority. We are dedicated to providing compassionate and personalized care that meets your unique needs. Our team of healthcare professionals is committed to enhancing your well-being through innovative solutions and attentive support. We strive to make your healthcare journey seamless and effective, empowering you with the knowledge and tools you need for better health.
                </Card.Text>
              </Card.Body>
            </Card>
          </section>

          <section className="image-slider my-5">
            <Slider {...sliderSettings}>
              <div><img src={bannerImage} alt="Slide 1" className="slider-image" /></div>
              <div><img src={bannerImage} alt="Slide 2" className="slider-image" /></div>
              <div><img src={bannerImage} alt="Slide 3" className="slider-image" /></div>
            </Slider>
          </section>

          <section className="our-promises my-5">
            <h2 className="text-center mb-4 section-heading">Our Promises</h2>
            <Row>
              {[
                { icon: <FaStethoscope />, title: 'Personalized Care', items: ['Routine check-ups', 'Preventive care', 'Management of chronic conditions'] },
                { icon: <FaUserMd />, title: 'Specialized Expertise', items: ['Cardiologists', 'Dermatologists', 'Orthopedists'] },
                { icon: <FaAmbulance />, title: 'Emergency Care', items: ['Treatment for acute injuries and illnesses', 'Emergency medical transportation'] },
                { icon: <FaBaby />, title: 'Maternity and Newborn Care', items: ['Prenatal care', 'Delivery services', 'Postnatal care for mothers and infants'] },
                { icon: <FaVideo />, title: 'Telehealth Services', items: ['Virtual consultations with healthcare providers', 'Remote monitoring of patient health metrics'] },
                { icon: <FaBrain />, title: 'Mental Health Services', items: ['Counseling', 'Therapy (individual, group, family)', 'Psychiatric evaluations and treatment'] },
                { icon: <FaTooth />, title: 'Dental Services', items: ['Routine dental exams and cleanings', 'Fillings, extractions, and other dental procedures'] },
                { icon: <FaHome />, title: 'Home Health Care', items: ['Skilled nursing care', 'Medical social services', 'Home infusion therapy'] },
              ].map((promise, index) => (
                <Col md={6} lg={3} className="mb-4" key={index}>
                  <Card className="promise-card h-100">
                    <Card.Body>
                      <div className="promise-item text-center">
                        <div className="promise-icon">{promise.icon}</div>
                        <Card.Title className="mt-2">{promise.title}</Card.Title>
                        {promise.items.map((item, idx) => (
                          <Card.Text key={idx} className="promise-text"><FaCheck className="check-icon" /> {item}</Card.Text>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Container>

        <footer className="client-home-footer">
          <Container>
            <Row>
              <Col xs={12} md={4} className="footer-col">
                <h5>About Us</h5>
                <p>We are committed to providing the best healthcare solutions and personalized care. Learn more about our services and team.</p>
              </Col>
              <Col xs={12} md={4} className="footer-col">
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/doctor">Search Doctor</a></li>
                  <li><a href="/clinic">Search Clinic</a></li>
                </ul>
              </Col>
              <Col xs={12} md={4} className="footer-col">
                <h5>Contact Us</h5>
                <p><FaEnvelope /> info@medimanage.com</p>
                <p><FaPhone /> (123) 456-7890</p>
                <p><FaGlobe /> <a href="https://www.medimanage.com" target="_blank" rel="noopener noreferrer">www.medimanage.com</a></p>
              </Col>
            </Row>
            <div className="footer-bottom text-center">
              <p>&copy; 2024 MediManage. All rights reserved.</p>
            </div>
          </Container>
        </footer>
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
