import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FindClinic.css';
import { searchClinicsRequest } from '../../../store/actions/searchActions'; // Adjust the import path
import { getAllClinicRequest } from '../../../store/actions/clinicActions';
import { useNavigate, useParams } from 'react-router';

function withRouter(Component: any) {
  function ComponentWithRouter(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouter;
}

interface ClinicAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Clinic {
  _id: string;
  name: string;
  address: ClinicAddress;
  phone: string;
  email: string;
  specialty: any[];
}

interface ClinicResponse {
  clinic: Clinic;
  doctor: any;
  users: any[];
}

interface FindClinicProps {
  searchClinics: (query: any) => void;
  getAllClinics: () => void;
  navigate: any;
  clinics: ClinicResponse[];
}

interface FindClinicState {
  searchName: string;
  searchCity: string;
}

class FindClinic extends Component<FindClinicProps, FindClinicState> {
  constructor(props: FindClinicProps) {
    super(props);
    this.state = {
      searchName: '',
      searchCity: ''
    };
  }

  componentDidMount(): void {
    this.props.getAllClinics();
  }

  handleSearch = () => {
    const { searchName, searchCity } = this.state;
    this.props.searchClinics({
      name: searchName,
      location: searchCity
    });
  };

  navigationToProfile = (clinic: Clinic) => {
    this.props.navigate(`/client/find-doctor/clinic/${clinic._id}`, { state: { clinic } });
  };

  setSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: e.target.value });
  };

  setSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchCity: e.target.value });
  };

  render() {
    const { clinics } = this.props;
    console.log(clinics, this.state);
    
    const { searchName, searchCity } = this.state;

    const filteredClinics = (searchName!=='' || searchCity !== '') ? clinics?.filter((clinic: any) => {
      return (
        clinic?.name?.toLowerCase().includes(searchName?.toLowerCase()) &&
        clinic?.address?.city?.toLowerCase().includes(searchCity?.toLowerCase())
      );
    }) : clinics;
    console.log(filteredClinics);
    

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
              <Button variant="primary" className="w-100" onClick={this.handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {filteredClinics?.map((clinic: ClinicResponse) => (
            <Col md={4} key={clinic.clinic._id} className="mb-4">
              <Card className="clinic-card">
                <Card.Body>
                  <Card.Title>{clinic.clinic.name}</Card.Title>
                  <Card.Text className="clinic-info">
                    <div className="clinic-info-item">
                      <strong>Location:</strong>
                      <span>
                        {clinic.clinic.address.street}, {clinic.clinic.address.city}, {clinic.clinic.address.state}, {clinic.clinic.address.country}, {clinic.clinic.address.zip}
                      </span>
                    </div>
                    <div className="clinic-info-item">
                      <strong>Email:</strong>
                      <span>{clinic.clinic.email}</span>
                    </div>
                    <div className="clinic-info-item">
                      <strong>Contact:</strong>
                      <span>{clinic.clinic.phone}</span>
                    </div>
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.navigationToProfile(clinic.clinic)}>View Details</Button>
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
  clinics: state?.clinic?.clinics // Adjust based on how clinics are stored in Redux state
});

const mapDispatchToProps = (dispatch: any) => ({
  searchClinics: (query: any) => dispatch(searchClinicsRequest(query)),
  getAllClinics: () => dispatch(getAllClinicRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindClinic));
