import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import { css } from '@emotion/css';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
    }}>
        <div className={css`
        background-color: #243248;
        min-height: 100vh;
      `}>
        <App />
        </div>
    </Context.Provider>,
  document.getElementById('root')
);

