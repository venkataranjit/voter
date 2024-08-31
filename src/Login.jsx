import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./Context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastObject = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
};

function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [loginUser, setLoginUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (loginUser.name === loginUser.password) {
      user.setUser(loginUser.name);
      toast.success("Login Succesful", toastObject);
      navigate("/", { replace: true });
    } else {
      toast.error("UserName and Password are not Same", toastObject);
    }
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col sm={4} className="offset-sm-4">
            <h4>Login Page</h4>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  name="name"
                  value={loginUser.name}
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginUser.password}
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
