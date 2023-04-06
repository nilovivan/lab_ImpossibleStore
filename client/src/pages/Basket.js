import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { useState } from 'react';
import { useEffect } from 'react';
import { cart_content, discount } from '../http/userAPI';
import { Container, Toast } from 'react-bootstrap';
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

    const [code, setCode] = useState();
    const [total, setTotal] = useState();

    const total_price = async () => {
        discount(code).then(data => {
            setTotal(data.price)
        })
    }

    console.log(total)

    return (
        <div>
            <Container>
            <CartList/>
            <input
                placeholder='Введите скидку'
                type='text'
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <button onClick={() => total_price()} className="button">Submit</button>
            </Container>
        </div>
    );
};

export default Basket;
