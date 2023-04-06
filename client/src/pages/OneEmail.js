import React from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { fetchOneMessage } from '../http/emailAPI';
import { useContext } from 'react';
import { Context } from '..';
import EmailList from '../components/EmailList';
import { useState } from 'react';
import { useParams,NavLink } from 'react-router-dom';
import { CHANGE_PASSWORD_ROUTE } from '../utils/consts';

const OneEmail = observer(() => {
    const [mail, setMail] = useState([])
    const {id} = useParams()

    useEffect(() => {
        fetchOneMessage(id).then(data => setMail(data)
        );
    }, [])

    const url = mail.text
    const parse = url?.split('?') || [2];
    let temp = parse[1]
    const parse_2 = temp?.split('=') || [2];
    let params = parse_2[1]
    console.log(params);
    localStorage.setItem('playload', params)

    const text = url?.split(': ') || [2];
    return (
        <Container className="mt-3">
            {text[0]}:  
            <NavLink to={CHANGE_PASSWORD_ROUTE}>
            {text[1]}
            </NavLink>
        </Container>
    );
});

export default OneEmail;