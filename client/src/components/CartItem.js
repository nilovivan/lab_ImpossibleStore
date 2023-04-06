import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';
import { css } from '@emotion/css';
import { useState, useEffect} from 'react';
import { fetchOneDevice } from '../http/deviceAPI';
import {Row} from "react-bootstrap";

const CartItem = ({device}) => {
    const [basket, setBasket] = useState([])
    useEffect(() => {
        fetchOneDevice(device.productId).then(data => setBasket(data)
        );
    }, [])
   
    let temp  = basket.price
    let total = +temp;
    console.log(total)

    return (
        <div style={{ display: 'block', 
        width: 700, padding: 30 }}>
<Row>
<Col>
         <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
        <div className={css`
background-color: #3a4963;
padding: 12px;
font-size: 16px;
font-family: cursive;
color:white;
`}>{basket.name}</div>
</Card>
      </Col>
        <Col>
          <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
        <div className={css`
background-color: #3a4963;
padding: 12px;
font-size: 16px;
font-family: cursive;
color:white;
`}>{basket.price} руб.</div>
</Card>
      </Col>
</Row>
</div>
    );
};

export default CartItem;
