import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { useState } from 'react';
import { useEffect } from 'react';
import { cart_content } from '../http/userAPI';
import { Container } from 'react-bootstrap';
import CartList from '../components/CartList';
import { fetchDevices, fetchOneDevice } from '../http/deviceAPI';
import { useParams } from 'react-router-dom';

const Basket = () => {

    const {device} = useContext(Context)

    useEffect(() => {
        cart_content().then(data => {
            device.setCart(data.goods)
        })
    }, [])
    console.log(device)
    


    const [data, setData] = useState();

    const handleType = (e) => {
        setData(e.target.value);
    };

    const handleSubmit = () => {
        eval(data);
    };

    return (
        <div>
            <Container>
            <CartList/>
            <input
                placeholder='Введите реферальную ссылку'
                type='text'
                value={data}
                onChange={(e) => handleType(e)}
            />
            <button onClick={() => handleSubmit()} className="button">Submit</button>
            </Container>
        </div>
    );
};

export default Basket;
