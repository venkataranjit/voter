import React, { useContext } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import { UserContext } from "./Context/UserContext";

const Home = () => {
  const {isLogin, setIsLogin} = useContext(UserContext);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>Home</p>
            <p>{isLogin ? "Login" : "Logout"}</p>
            <button onClick={()=>setIsLogin(!isLogin)} >Change State</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
