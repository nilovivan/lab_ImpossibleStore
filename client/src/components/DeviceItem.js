import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';
import { css } from '@emotion/css';

const DeviceItem = ({device}) => {
    const history = useHistory()
    
    return (
        <Col md={3} className={'mt-3'} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div className={css`
        background-color: #3a4963;
        padding: 12px;
        font-size: 16px;
        font-family: cursive;
        color:white;
        `}>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;