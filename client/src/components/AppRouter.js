import React from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../route";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useContext } from "react";

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
  return (
      < Routes>
        {user.isAuth && authRoutes.map(({path,Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {publicRoutes.map(({path,Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
        )}
         <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
      </Routes>
  );
};
 
export default AppRouter; 