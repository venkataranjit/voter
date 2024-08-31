import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const VoterDetails = () => {
  const location = useLocation();
  const { state } = location;
  const voter = state?.voter;
  const [error, setError] = React.useState(null);

  if (!voter) {
    return <Container><h6>No voter data available</h6></Container>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4>Voter Details</h4>
            <p>Id: {voter.id}</p>
            <p>City: {voter.city}</p>
            <p>Name: {voter.name}</p>
            <p>Age: {voter.age}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VoterDetails;
