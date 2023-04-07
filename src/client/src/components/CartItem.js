import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';
import { css } from '@emotion/css';
import { useState, useEffect} from 'react';
import { fetchOneDevice } from '../http/deviceAPI';

const CartItem = ({device}) => {
    const [basket, setBasket] = useState([])
    useEffect(() => {
        fetchOneDevice(device.productId).then(data => setBasket(data)
        );
    }, [])
    console.log(basket)
    
    return (
        <Col md={3} className={'mt-3'}>
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
          
    );
};

export default CartItem;