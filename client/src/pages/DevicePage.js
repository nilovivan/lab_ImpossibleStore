import React from "react";
import { Container, Col, Image, Form, Row, Card, Button} from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOneDevice } from "../http/deviceAPI";
import { css } from '@emotion/css';

const DevicePage = () => {
  const [device, setDevice] = useState({description: []})
  const {id} = useParams()

  useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data));
  }, [])

  const [cart,setCart] = useState([])
    const AddToCart = (device) => {
        setCart([...cart, device])
        console.log(cart)
    }

  return (
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
          </Col>
          <Col md={4}>
            <Form className="d-flex flex-column align-items-center">
            <Card style={{width: 350, cursor: 'pointer'}} border={'light'}>
                    <div className={css`
        background-color: #3a4963;;
        padding: 32px;
        font-size: 24px;
        border-radius: 2px;
        color: white;
        font-family: cursive;
        `}>{device.name}</div>
            </Card>
            </Form>
          </Col>
          <Col md={4}>
            <Card 
            className={css`
            background-color: #3a4963;
            padding: 32px;
            font-size: 24px;
            width: 300;
            height: 300;
            border: 0px;
            border-radius: 2px;
            text-align: center;
            flex-direction: column;
            color: white;
            font-family: cursive;
            `}
            >
              <h3>От: {device.price} руб.</h3>
              <Button className={css`
                            padding-top: 2px;
                            padding-right: 27px;
                            padding-bottom: 2px;
                            padding-left: 27px;
                            background-color: #33b0b3;
                            font-size: 16px;
                            border: 2px solid transparent;
                            border-radius: 3px;
                            color: white;
                            &:hover {
                              color: #33b0b3;
                              background-color: #3a4963;
                              border: 2px solid;
                            }
                          `}
                          onClick={ () => AddToCart(device)}
                          >Добавить в корзину</Button>
            </Card>
          </Col>
          </Row>
          <Row className="d-flex flex-column m-3">
            <h1 className={css`
        font-size: 24px;
        color: white;
        font-family: cursive;
        `}>Описание</h1>
            <Card style={{width: 1000, cursor: 'pointer'}} border={'light'}>
                    <div className={css`
        background-color: #3a4963;;
        padding: 32px;
        font-size: 16px;
        border-radius: 2px;
        color: white;
        font-family: cursive;
        `}>{device.description}</div>
            </Card>
          </Row>
      </Container>
  );
};
 
export default DevicePage;
