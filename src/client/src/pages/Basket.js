import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { useState } from 'react';
import { useEffect } from 'react';
import { cart_content, discount } from '../http/userAPI';
import { Container, Toast } from 'react-bootstrap';
import { fetchDevices, fetchOneDevice } from '../http/deviceAPI';
import { useParams } from 'react-router-dom';
import { add_to_cart, remove_from_cart } from "../http/userAPI";
import { Card} from "react-bootstrap";
import { css } from '@emotion/css';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Basket = () => {

    const [code, setCode] = useState();
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const total_price = async () => {
        discount(code).then(data => {
            setTotal(data.price)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
          const cartData = await cart_content();
          const itemIds = cartData.goods.map((item) => item.productId);
    
          const items = await Promise.all(itemIds.map((id) => fetchOneDevice(id)));
    
          const itemsWithCount = items.reduce((acc, item) => {
            const index = acc.findIndex((el) => el.id === item.id);
            if (index !== -1) {
              acc[index].count++;
            } else {
              acc.push({ ...item, count: 1 });
            }
            return acc;
          }, []);
    
          setCartItems(itemsWithCount);
          setTotal(itemsWithCount.reduce((acc, item) => acc + item.price * item.count, 0));
        };
    
        fetchData();
      }, []);
    
      const handleCountChange = (id, type) => {
        const newCartItems = cartItems.map((item) => {
          if (item.id === id) {
            if (type === 'inc') {
                add_to_cart(id);
              return { ...item, count: item.count + 1 };
            } else if (type === 'dec') {
                remove_from_cart(id);
              return { ...item, count: item.count - 1 };
            }
          }
          return item;
        }).filter(item => item.count > 0);
    
        setCartItems(newCartItems);
        setTotal(newCartItems.reduce((acc, item) => acc + item.price * item.count, 0));
      }
  

    return (
        <div>
            <Container>
      <table className={css`
            padding: 122px;
            margin-top: 20px;
            font-size: 24px;
            border-radius: 4px;
            color: white;
            font-family: cursive;
            `}>
        <thead >
          <tr>
            <th>Имя</th>
            <th>Цена</th>
            <th>Кол-во</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <button onClick={() => handleCountChange(item.id, 'dec')} className={css`
                            padding-top: 2px;
                            padding-right: 27px;
                            padding-bottom: 2px;
                            padding-left: 27px;
                            margin-left: 12px;
                            margin-right: 12px;
                            background-color: #33b0b3;
                            font-size: 16px;
                            border: 2px solid transparent;
                            border-radius: 3px;
                            color: white;
                            &:hover {
                              color: #33b0b3;
                              background-color: #243248;
                              border: 2px solid;
                            }
                          `}>-</button>
              {item.count}
                <button onClick={() => handleCountChange(item.id, 'inc')} className={css`
                            padding-top: 2px;
                            padding-right: 27px;
                            padding-bottom: 2px;
                            padding-left: 27px;
                            margin-left: 12px;
                            background-color: #33b0b3;
                            font-size: 16px;
                            border: 2px solid transparent;
                            border-radius: 3px;
                            color: white;
                            &:hover {
                              color: #33b0b3;
                              background-color: #243248;
                              border: 2px solid;
                            }
                          `}>+</button>
            </tr>
            
          ))}
        </tbody>
      </table>
      <p className={css`
            font-size: 24px;
            border-radius: 4px;
            color: white;
            font-family: cursive;
            `}>Сумма: {total}</p>
      <Card style={{width: 400}} className={css`
        background-color: #33425a;
        padding-top: 6px;
        padding-right: 17px;
        padding-bottom: 12px;
        padding-left: 17px;
        font-size: 24px;
        border-radius: 4px;
        font-family: cursive;
        `}>
            <Form.Control
                className="mt-3"
                placeholder='Введите скидку'
                type='text'
                value={code}
                onChange={e => setCode(e.target.value)}
                    />
            <Button style={{width: 150}} onClick={() => total_price()} className={css`
                            margin-top: 12px;
                            padding-top: 2px;
                            padding-right: 27px;
                            padding-bottom: 2px;
                            padding-left: 27px;
                            align-self: flex-end;
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
                          `}>Submit</Button>

                          </Card>
            </Container>
        </div>
    );
};

export default Basket;
