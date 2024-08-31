import React, { useContext } from "react";
import { Container, Row, Col, Alert  } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { VoterContext } from "./Context/VoterContext";
const VoterDetails = () => {
  const params = useParams();

  const { voter } = useContext(VoterContext);

  const data = voter.find((eachUser) => eachUser.id === params.voterid);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4>Voter Details</h4>
            {data ? (
              <>
                <p>Id: {data.id}</p>
                <p>City: {data.city}</p>
                <p>Name: {data.name}</p>
                <p>Age: {data.age}</p>
              </>
            ) : (
              <Alert variant="danger">No details found for ID: {params.voterid}</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VoterDetails;
