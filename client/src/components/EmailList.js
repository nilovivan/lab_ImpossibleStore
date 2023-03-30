import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CartItem from "./EmailItem";

const CartList = observer(() => {
    const {pochta} = useContext(Context)
    return (
        <Row className="d-flex">
            {pochta.messages.map(pochta =>
                <CartItem key={pochta.id} pochta={pochta}/>
            )}
        </Row>
    );
});

export default CartList;