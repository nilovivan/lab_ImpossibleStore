import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {EMAIL_ROUTE, EMAIL_LOGIN_ROUTE, EMAIL_REGISTRATION_ROUTE} from "../utils/consts";
import {email_login, email_registration} from "../http/emailAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { css } from '@emotion/css';

const EmailAuth = observer(() => {
    const {pochta} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isEmailLogin = location.pathname === EMAIL_LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isEmailLogin) {
                data = await email_login(email, password);
            } else {
                data = await email_registration(email, password);
            }
            pochta.setPochta(data)
            pochta.setIsEmailAuth(true)
            history.push(EMAIL_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

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
        `}>{isEmailLogin ? 'Авторизация ' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isEmailLogin ?
                            <div style={{color: 'white'}} className={css`
                            font-size: 16px;
                          `}>Нет аккаунта?
             
                            <NavLink to={EMAIL_REGISTRATION_ROUTE} className={css`
                            color:white;
                            &:hover {
                             color: #33b0b3;
                            }
                          `}> Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div style={{color: 'white'}} className={css`
                            font-size: 16px;

                          `}>
                                Есть аккаунт? 
                                
                                <NavLink to={EMAIL_LOGIN_ROUTE} className={css`
                            color:white;
                            &:hover {
                             color: #33b0b3;
                            }
                          `}> Войдите!</NavLink>
                            </div>
                        }
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
                            onClick={click}
                        >
                            {isEmailLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
        </div>
    );
});

export default EmailAuth;
