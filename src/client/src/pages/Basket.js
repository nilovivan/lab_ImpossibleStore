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
            <div>
      <table>
        <thead>
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
              <button onClick={() => handleCountChange(item.id, 'dec')}>-</button>
                {item.count}
                <button onClick={() => handleCountChange(item.id, 'inc')}>+</button>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Сумма: {total}</p>
    </div>
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
