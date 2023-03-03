import React from "react";
import { Container, Col, Image, Form, Row, Card, Button} from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({description: []})
  const {id} = useParams()

  useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data));
  }, [])

  return (
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
          </Col>
          <Col md={4}>
            <Form className="d-flex flex-column align-items-center">
              <h2>{device.name}</h2>
            </Form>
          </Col>
          <Col md={4}>
            <Card 
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
            >
              <h3>От: {device.price} руб.</h3>
              <Button variant={'outline-dark'}>Добавить в корзину</Button>
            </Card>
          </Col>
          </Row>
          <Row className="d-flex flex-column m-3">
            <h1 style={{color: 'red'}}>Описание</h1>
            <h2>{device.description}</h2>
          </Row>
      </Container>
  );
};
 
export default DevicePage;
