import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FindDoctor.css';
import doctor1 from '../../../images/doctor1.png';
import { connect } from 'react-redux';
import { searchDoctorsRequest } from '../../../store/actions/searchActions';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { getAllDoctorsRequest, getDoctorByClinicIdRequest } from '../../../store/actions/doctorActions';

interface FindDoctorProps {
  searchDoctors: (query?: any, onCallSuccess?: Function) => void;
  getDoctorsByClinic: (clinicId: string, onCallSuccess?: Function) => void;
  navigate: NavigateFunction;
  doctors: any;
  params: any;
  getAllDoctors: (onCallSuccess?: Function) => void;
}

interface FindDoctorState {
  searchName: string;
  searchCity: string;
  searchSpeciality: string;
}

function withRouter(Component: any) {
  function ComponentWithRouter(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouter;
}

class FindDoctor extends Component<FindDoctorProps, FindDoctorState> {
  constructor(props: FindDoctorProps) {
    super(props);
    this.state = {
      searchName: '',
      searchCity: '',
      searchSpeciality: ''
    };
  }

  componentDidMount(): void {
    if(this.props.params.clinic_id){
      this.props.getDoctorsByClinic(this.props.params.clinic_id)
    } else {
      this.props.getAllDoctors();
    }
  }

  setSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: e.target.value });
  };

  setSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCity: e.target.value });
  };

  setSearchSpeciality = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchSpeciality: e.target.value });
  };

  handleSearch = () => {
    const { searchName, searchCity, searchSpeciality } = this.state;
    this.props.searchDoctors({
      name: searchName,
      location: searchCity,
      speciality: searchSpeciality
    });
  };

  navigationToProfile = (data: any) => {
    this.props.navigate(`/client/doctor-clinic-info/${data._id}`, { state: { data } });
  };

  render() {
    const { doctors } = this.props;
    const { searchName, searchCity, searchSpeciality } = this.state;

    console.log(doctors);
    

    return (
      <Container className="find-doctor-container">
        <h1 className="find-doctor-header">Find a Doctor</h1>
        <Form>
          <Row className="mb-3">
            <Col lg={4}>
              <Form.Control
                type="text"
                placeholder="Search by Doctor Name"
                value={searchName}
                onChange={this.setSearchName}
              />
            </Col>
            <Col lg={4}>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={searchCity}
                onChange={this.setSearchCity}
              />
            </Col>
            <Col lg={4}>
              <Form.Control
                type="text"
                placeholder="Enter Speciality"
                value={searchSpeciality}
                onChange={this.setSearchSpeciality}
              />
            </Col>
            <Col className="text-left mt-3" lg={12}>
              <Button variant="primary" className="w-100" onClick={this.handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {doctors.map((doctor: any) => (
            <Col md={4} key={doctor._id} className="mb-4">
              <Card className="doctor-card">
                <div className="doctor-image-wrapper">
                  <Card.Img variant="top" src={doctor.image ? doctor.image : doctor1} className="doctor-image" />
                </div>
                <Card.Body>
                  <Card.Title>{doctor.user.firstName} {doctor.user.lastName}</Card.Title>
                  <Card.Text className="doctor-info">
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
  doctors: state.doctors.doctors, // Adjust this based on where the searched doctors are stored
});

const mapDispatchToProps = (dispatch: any) => ({
  searchDoctors: (query?: any, onCallSuccess?: Function) => dispatch(searchDoctorsRequest(query, onCallSuccess)),
  getAllDoctors: (onCallSuccess?: Function) => dispatch(getAllDoctorsRequest(onCallSuccess)),
  getDoctorsByClinic: (clinicId: string, onCallSuccess?: Function) => dispatch(getDoctorByClinicIdRequest(clinicId, onCallSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindDoctor));
