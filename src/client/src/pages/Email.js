import React from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { fetchMessages } from '../http/emailAPI';
import { useContext } from 'react';
import { Context } from '..';
import EmailList from '../components/EmailList';

const Email = observer(() => {
    const {pochta} = useContext(Context)

    useEffect(() => {
        fetchMessages().then(data => {
            pochta.setMessages(data)
        })
    }, [])
    console.log(pochta)

    return (
        <Container>
            <EmailList/>
        </Container>
    );
});

export default Email;