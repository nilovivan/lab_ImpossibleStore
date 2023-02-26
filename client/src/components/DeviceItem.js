import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    console.log(navigate)
    return (
        <Col md={3} className={'mt-3'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;