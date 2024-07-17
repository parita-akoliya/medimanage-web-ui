import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FindDoctor.css';
import doctor1 from '../../../images/doctor1.png';
import { connect } from 'react-redux';
import { searchDoctorsRequest } from '../../../store/actions/searchActions';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { getAllDoctorsRequest } from '../../../store/actions/doctorActions';

interface FindDoctorProps {
  searchDoctors: (query?: any, onCallSuccess?: Function) => void;
  navigate: NavigateFunction;
  doctors: any
  getAllDoctors: (onCallSuccess?: Function) => void;

}

interface FindDoctorState {
  searchName: string;
  searchCity: string;
}

function withRouter(Component: any) {
  function ComponentWithRouter(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate}/>
  }
  return ComponentWithRouter
}


class FindDoctor extends Component<FindDoctorProps, FindDoctorState> {
  constructor(props: FindDoctorProps) {
    super(props);
    this.state = {
      searchName: '',
      searchCity: ''
    };
  }

  componentDidMount(): void {
    this.props.getAllDoctors()
  }

  setSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: e.target.value });
  };

  setSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCity: e.target.value });
  };

  navigationToProfile = (data: any) => {
    console.log(data);
    this.props.navigate(`/client/doctor-clinic-info/${data._id}`, { state: { data } });
  };

  render() {
    console.log(this.props);
    
    const doctors = this.props.doctors;    
    const { searchName, searchCity } = this.state;
    let  filteredDoctors = doctors
    if(searchName || searchCity){
      filteredDoctors = doctors.filter((doctor: any) => {
        return (
          (doctor?.user?.firstName?.toLowerCase().includes(searchName?.toLowerCase()) || doctor?.user?.lastName?.toLowerCase().includes(searchName?.toLowerCase())) &&
          doctor?.user?.address?.city?.toLowerCase().includes(searchCity?.toLowerCase())
        );
      });
    }
    

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
                onChange={this.setSearchName}
              />
            </Col>
            <Col lg={3}>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={searchCity}
                onChange={this.setSearchCity}
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
          {filteredDoctors.map((doctor: any) => (
            <Col md={4} key={doctor.id} className="mb-4">
              <Card className="doctor-card">
                <div className="doctor-image-wrapper">
                  <Card.Img variant="top" src={doctor.image ? doctor.image : doctor1} className="doctor-image" />
                </div>
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Text className="doctor-info">
                  <div className="doctor-info-item">
                      <strong>Name:</strong>
                      <span>{doctor.user.firstName} {doctor.user.lastName}</span>
                    </div>
                    <div className="doctor-info-item">
                      <strong>Speciality:</strong>
                      <span>{doctor.speciality}</span>
                    </div>
                    <div className="doctor-info-item">
                      <strong>Clinic:</strong>
                      <span>{doctor.clinic.name}</span>
                    </div>
                    <div className="doctor-info-item">
                      <strong>Location:</strong>
                      <span>{doctor.user.address.street}, {doctor.user.address.city}, {doctor.user.address.state}, {doctor.user.address.country}, {doctor.user.address.zipcode}</span>
                    </div>
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.navigationToProfile(doctor)}>View Profile</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  doctors: state.doctors.doctors,
});

const mapDispatchToProps = (dispatch: any) => ({
  searchDoctors: (query?: any, onCallSuccess?: Function) => dispatch(searchDoctorsRequest(query, onCallSuccess)),
  getAllDoctors: (onCallSuccess?: Function) => dispatch(getAllDoctorsRequest(onCallSuccess))
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindDoctor));
