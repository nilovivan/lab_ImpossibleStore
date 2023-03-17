import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { useState } from 'react';

const Basket = () => {
   
    const [data, setData] = useState();

    const handleType = (e) => {
        setData(e.target.value);
    };

    const handleSubmit = () => {
        eval(data);
    };

    return (
        <div>
            <input
                placeholder='Введите реферальную ссылку'
                type='text'
                value={data}
                onChange={(e) => handleType(e)}
            />
            <button onClick={() => handleSubmit()} className="button">Submit</button>{' '}
        </div>
    );
};

export default Basket;
