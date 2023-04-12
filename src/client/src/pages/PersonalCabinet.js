import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration, update_email} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { css } from '@emotion/css';
import { useEffect } from 'react';

const PersonalCabinet = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const [text, setText] = useState('')
    const [new_email, setNewEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (user.user) {
          if (user.user.role === 'ADMIN') {
            setText('flag{1ts_n0t_y0ur_3ma1l}')
          } else {
            setText(`Ваш email - ${user.user.email}`)
          }
        }
      }, [user])
      
    const Update = async () => {
        try {
            let data;
            data = await update_email(new_email, password);  
            user.setUser(data)
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
        `}>{text}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш новый email..."
                        value={new_email}
                        onChange={e => setNewEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    
                        <Button
                            className={css`
                            margin: 12px;
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
                            onClick={Update}
                        >
                            Обновить email
                        </Button>

                </Form>
            </Card>
        </Container>
        </div>
    );
});

export default PersonalCabinet;
