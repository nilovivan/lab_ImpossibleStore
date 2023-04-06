import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CartItem from "./CartItem";

const CartList = observer(() => {
    const {device} = useContext(Context)
    return (
        <div>
            <h1>Название товара  Цена</h1>
        <Row className="d-flex">
            {device.cart.map(device =>
                <CartItem key={device.id} device={device}/>
            )}
        </Row>
        </div>
    );
});

export default CartList;