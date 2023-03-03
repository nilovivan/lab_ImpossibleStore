import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../components/modals/CreateDevice";
import { css } from '@emotion/css';

const Admin = () => {
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Button className={css`
                            padding: 2px;
                            margin-top: 12px;
                            background-color: #33b0b3;
                            font-size: 16px;
                            border: 2px solid transparent;
                            border-radius: 3px;
                            color: white;
                            width:500px;
                            &:hover {
                              color: #33b0b3;
                              background-color: #3a4963;
                              border: 2px solid;
                            }
                          `}
                variant={"outline-dark"}
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;
