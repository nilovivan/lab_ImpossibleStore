import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {emailRoutes, authRoutes, publicRoutes} from "../routes";
import {EMAIL_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const {pochta} = useContext(Context)
    console.log(user)
    console.log(pochta)
    return (
        <Switch>
               {/* Рендеринг публичных роутов */}
  {publicRoutes.map(({ path, Component }) => (
    <Route key={path} path={path} component={Component} exact />
  ))}

  {/* Рендеринг защищенных роутов для авторизованных пользователей */}
  {user.isAuth &&
    authRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} component={Component} exact />
    ))}

  {/* Рендеринг защищенных роутов для пользователей, авторизованных по email */}
  {pochta.isEmailAuth &&
    emailRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} component={Component} exact />
    ))}

  {/* Перенаправление на SHOP_ROUTE, если пользователь не авторизован */}
  {!user.isAuth && !pochta.isEmailAuth && (
    <Redirect to={SHOP_ROUTE} />
  )}
        </Switch>
    );
});

export default AppRouter;
