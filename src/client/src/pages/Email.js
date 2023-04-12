import React from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { fetchMessages } from '../http/emailAPI';
import { useContext } from 'react';
import { Context } from '..';
import { Card} from "react-bootstrap";
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { EMAIL_ROUTE } from '../utils/consts';

const Email = observer(() => {
    const {pochta} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        fetchMessages().then(data => {
            pochta.setMessages(data)
        })
    }, [])
    console.log(pochta)

    return (
        <div>
      <table className={css`
        min-height: 100vh;
        table-layout: fixed;
        padding: 122px;
        margin-top: 20px;
        font-size: 24px;
        border-radius: 4px;
        color: white;
        font-family: cursive;
        `}>
        <thead>
          <tr>
            <th className={css`
        background-color: #33425a;
        border: 2px solid black;
        padding: 10px;
        `}>Id</th>
            <th className={css`
        background-color: #33425a;
        border: 2px solid black;
        padding: 10px;
        `}>От кого</th>
            <th className={css`
        background-color: #33425a;
        border: 2px solid black;
        padding: 10px;
        `}>Текст</th>
          </tr>
        </thead>
        <tbody>
          {pochta.messages.map(pochta => (
            <tr key={pochta.id}>
              <td className={css`
        border: 2px solid black;
        padding: 10px;
        `}>{pochta.id}</td>
              <td className={css`
        border: 2px solid black;
        padding: 10px;
        `}>{pochta.from}</td>
              <td className={css`
        border: 2px solid black;
        padding: 10px;
        &:hover {
          color: white;
          background-color: #33425a;
          border: 2px solid black;
        `} onClick={() => history.push(EMAIL_ROUTE + '/' + pochta.id)} >{pochta.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
});

export default Email;