import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";
import { css } from '@emotion/css';

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchDevices().then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page])

    return (
        <div>
        <Container>
            <Row className="mt-2">
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
        </div>
    );
});

export default Shop;
