import Admin from "./pages/Admin";
import {CHANGE_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE, EMAIL_REGISTRATION_ROUTE, EMAIL_LOGIN_ROUTE, EMAIL_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CABINET_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import PersonalCabinet from "./pages/PersonalCabinet";
import Email from "./pages/Email";
import EmailAuth from "./pages/EmailAuth";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import OneEmail from "./pages/OneEmail";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: CABINET_ROUTE,
        Component: PersonalCabinet
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetPassword
    },
]

export const emailRoutes = [
    {
        path: EMAIL_ROUTE,
        Component: Email
    },
    {
        path: EMAIL_ROUTE + '/:id',
        Component: OneEmail
    },
    {
        path: CHANGE_PASSWORD_ROUTE,
        Component: ChangePassword
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: EMAIL_LOGIN_ROUTE,
        Component: EmailAuth
    },
    {
        path: EMAIL_REGISTRATION_ROUTE,
        Component: EmailAuth
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetPassword
    },
]
