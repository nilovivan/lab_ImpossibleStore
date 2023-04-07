import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import { css } from '@emotion/css';
import { useEffect } from 'react';
import { fetchOneMessage } from '../http/emailAPI';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const [new_password, setNew_Password] = useState('')

    const params = localStorage.getItem('playload')
    console.log(params);

    const ads =  (event) => {
        event.preventDefault();
    fetch(`http://localhost:7000/api/user/change-password?user=${params}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        new_password: new_password
    })
    })
    .then(response => {
    console.log(response)
    })
    .catch(error => {
    // Обработка ошибки
    });
    }

    return (
        <div className={css`
        background-color: #243248;
      `}>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={css`
        background-color: #33425a;
        padding: 32px;
        font-size: 24px;
        border-radius: 4px;
        font-family: cursive;
        `}>
                <h2 style={{color: 'white'}}  className={css`
        text-align: center;
        font-family: cursive;
        font-size: 30px;
        `}>{"Восстановление пароля"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш новый пароль"
                        type="password"
                        value={new_password}
                        onChange={(event) => setNew_Password(event.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            className={css`
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
                            onClick={ads}
                        >
                            {'Сбросить пароль'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
        </div>
    );
};

export default ChangePassword;