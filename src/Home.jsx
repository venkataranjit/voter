import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./App.css";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  const getData = async (url) => {
    try {
      const response = await fetch(`${url}${search}`);
      const data = await response.json();
      if (data.drinks) {
        setDrinks(data.drinks);
        setError(false);
      } else {
        setError(true);
        setDrinks([]);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    getData(URL);
  }, [search]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Control
              className="float-end mb-3"
              placeholder="Search..."
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>idDrink</th>
                  <th>strDrink</th>
                  <th>strDrinkThumb</th>
                  <th>strCategory</th>
                </tr>
              </thead>
              <tbody>
                {drinks.map((eachItem) => (
                  <tr key={eachItem.idDrink}>
                    <td>{eachItem.idDrink}</td>
                    <td>{eachItem.strDrink}</td>
                    <td><Image src={eachItem.strDrinkThumb} alt={eachItem.strDrinkThumb} thumbnail className="img-thumbnail"/></td>
                    <td>{eachItem.strCategory}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {error && (
          <Row>
            <Col>
              <span>No Search Data</span>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Home;
