import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {EMAIL_LOGIN_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE,CABINET_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import { css } from '@emotion/css';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {pochta} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    const EmaillogOut = () => {
        pochta.setPochta({})
        pochta.setIsEmailAuth(false)
        localStorage.removeItem('email_token')
    }

    return (
        <Navbar className={css`
        padding: 12px;
        background-color: #33425a;
        font-size: 20px;
        font-family: cursive;
        `}>
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>The super vulnurable web apllication</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(CABINET_ROUTE)}
                        >
                            Личный кабинет
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(BASKET_ROUTE)}
                            className="ml-2"
                        >
                            Корзина
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                            className="ml-2"
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    pochta.isEmailAuth ?
                    <Button
                            variant={"outline-light"}
                            onClick={() => EmaillogOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"}  onClick={() => history.push(LOGIN_ROUTE)} >Авторизация</Button>
                        <Button variant={"outline-light"} className="ml-2" onClick={() => history.push(EMAIL_LOGIN_ROUTE)} >Почта</Button>
                    </Nav>
                    }
                
            </Container>
        </Navbar>

    );
});

export default NavBar;
