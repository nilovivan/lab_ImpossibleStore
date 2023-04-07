import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
    const {device} = useContext(Context)
    const [data, setData] = useState();

    const handleType = (e) => {
        setData(e.target.value);
    };
    
    const handleSubmit = () => {
        const filtered = device.devices.filter((device) => {
            return device.name.toLowerCase().includes(data.toLowerCase());
          });
          device.setDevices(filtered);
        eval(data);
    }

  return (
    <div>
            <input
                placeholder='Введите название товара'
                type='text'
                value={data}
                onChange={(e) => handleType(e)}
            />
            <button onClick={() => handleSubmit()} className="button">Submit</button>
        </div>
  );
});

export default Search;