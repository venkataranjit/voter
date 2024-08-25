import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast, Slide } from "react-toastify";
import "./VoterList.scss";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import URL from "./URL";

const initialVoterData = () => {
  return [
    {
      id: "00001",
      city: "guntur",
      name: "Ranjit Victory",
      age: 32,
      hasVoterId: true,
    },
  ];
};

const inputData = () => {
  return {
    id: "",
    city: "",
    name: "",
    age: "",
    hasVoterId: "",
  };
};

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
const VoterList = () => {
  const [voter, setVoter] = useState(initialVoterData);
  const [input, setInput] = useState(inputData);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState("");
  const [errDisplay, setErrDisplay] = useState("");
  const getData = async () => {
    try {
      const resp = await axios(URL);
      setVoter([...initialVoterData(), ...resp.data]);
    } catch (err) {
      setErrDisplay(err.message);
    }
  };

  const postData = async () => {
    try {
      const data = {
        id: Date.now().toString(),
        city: input.city,
        name: input.name,
        age: input.age,
        hasVoterId: input.hasVoterId === "yes" ? true : false,
      };
      await axios.post(URL, data);
    } catch (err) {
      setErrDisplay(err.message);
    }
  };

  const updateData = async () => {
    try {
      const data = {
        city: input.city,
        name: input.name,
        age: input.age,
        hasVoterId: input.hasVoterId === "yes" ? true : false,
      };
      await axios.put(`${URL}/${input.id}`, data);
    } catch (err) {
      setErrDisplay(err.message);
      toast.error("Error updating data", toastObject);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const resp = await axios.delete(`${URL}/${id}`);
      if (!resp) {
        throw new Error("Data Not Deleted");
      }
      const list = voter.filter((eachitem) => eachitem.id !== id);
      setVoter(list);
      toast.success("Data Deleted Succesfully", toastObject);
    } catch (err) {
      toast.error(err.message, toastObject);
    }
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInput((previnput) => ({
      ...previnput,
      [name]: value,
    }));
  };

  const resetHandler = () => {
    setInput(inputData());
    setEdit(null);
    toast.success("Input Fields Reset Succesfully", toastObject);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateData();
        toast.success("Data Updated Successfully", toastObject);
      } else {
        await postData();
        toast.success("Data Added Successfully", toastObject);
      }
      await getData();
    } catch (err) {
      toast.error("Error during data submission", toastObject);
    } finally {
      setInput(inputData());
      setEdit(null);
    }
  };

  const FilteredData = () => {
    return voter.filter((eachItem) => {
      return (
        eachItem.city.toLowerCase().includes(search.toLowerCase()) ||
        eachItem.name.toLowerCase().includes(search.toLowerCase()) ||
        eachItem.age.toString().includes(search) ||
        eachItem.hasVoterId
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  };

  const editHandler = (id) => {
    const voterToEdit = voter.find((eachItem) => eachItem.id === id);
    if (voterToEdit) {
      setInput({
        id: voterToEdit.id,
        city: voterToEdit.city,
        name: voterToEdit.name,
        age: voterToEdit.age,
        hasVoterId: voterToEdit.hasVoterId === true ? "yes" : "no",
      });
      setEdit(voterToEdit.id);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="voterList">
        <Container className="my-5">
          <Row>
            <Col>
              <h2 className="float-start">Vote Eligibility</h2>
            </Col>
            <Col md={3}>
              <Form.Control
                className="float-end"
                placeholder="Search..."
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={submitHandler}>
                <Stack direction="horizontal" gap={3} className="my-3">
                  <Col lg={2}>
                    <Form.Select
                      aria-label="Default select example"
                      name="city"
                      value={input.city}
                      onChange={changeHandler}
                    >
                      <option defaultValue>Select City</option>
                      <option value="guntur">Guntur</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="vijayawada">Vijayawada</option>
                    </Form.Select>
                  </Col>

                  <Form.Control
                    className="me-auto"
                    placeholder="Full Name"
                    name="name"
                    value={input.name}
                    onChange={changeHandler}
                  />
                  <Col lg={2}>
                    <Form.Select
                      name="hasVoterId"
                      value={input.hasVoterId}
                      onChange={changeHandler}
                    >
                      <option defaultValue>Voter ID ?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Form.Select>
                  </Col>
                  <Col lg={2}>
                    <Form.Control
                      className="me-auto"
                      placeholder="Age"
                      name="age"
                      value={input.age}
                      onChange={changeHandler}
                    />
                  </Col>

                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                  <div className="vr" />
                  <Button variant="outline-danger" onClick={resetHandler}>
                    Reset
                  </Button>
                </Stack>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr className="table-primary">
                    <th>#</th>
                    <th>City</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Voter Card ?</th>
                    <th>Eligibility</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredData().map((eachitem, index) => {
                    return (
                      <tr key={eachitem.id}>
                        <td>{index + 1}</td>
                        <td>{eachitem.city}</td>
                        <td>{eachitem.name}</td>
                        <td>{eachitem.age}</td>
                        <td>{eachitem.hasVoterId === true ? "Yes" : "No"}</td>
                        <td>
                          {eachitem.age > 18
                            ? eachitem.hasVoterId === true
                              ? "You Are Eligible to Vote"
                              : "Please Apply Voter ID"
                            : "You are not Eligible to Vote"}
                        </td>
                        <td
                          className="text-center edit"
                          onClick={() => editHandler(eachitem.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                          </svg>
                        </td>
                        <td
                          className="text-center delete"
                          onClick={() => deleteHandler(eachitem.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {errDisplay && <Alert variant="danger">{errDisplay}</Alert>}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default VoterList;
