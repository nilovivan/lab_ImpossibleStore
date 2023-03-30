import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { useState } from 'react';
import Search from '../components/Search';

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    const [data, setData] = useState();
    

    const handleType = (e) => {
        setData(e.target.value);
    };

    const handleSubmit = () => {
        const filtered = device.devices.filter((device) => {
            return device.name.toLowerCase().includes(data.toLowerCase());
          });
          device.setDevices(filtered);
        eval(data);
    }

    return (
        <Row className="d-flex">
            <Search/>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
});

export default DeviceList;