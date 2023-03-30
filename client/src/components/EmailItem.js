import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { EMAIL_ROUTE } from '../utils/consts';

const EmailItem = ({pochta}) => {
    const history = useHistory()

    return (
        <Col md={3} className={'mt-3'} onClick={() => history.push(EMAIL_ROUTE + '/' + pochta.id)}>
        <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <div className={css`
    background-color: #3a4963;
    padding: 12px;
    font-size: 16px;
    font-family: cursive;
    color:white;
    `}>{pochta.text}</div>
        </Card>
    </Col>
          
    );
};

export default EmailItem;