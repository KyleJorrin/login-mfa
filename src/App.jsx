import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import Start from './Start.jsx';
import Login from './Login.jsx';
import Auth from './Auth.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';

const router = createBrowserRouter([
  {path: "/", element: <Start />},
  {path: "/login", element: <Login />},
  {path: "/auth", element: <Auth />},
  {path: "/signup", element: <SignUp />},
  {path: "/dashboard", element: <Dashboard />}
]);

export const UserContext = createContext();

export const CardContext = createContext();

export default function App (){

    let users = [
        {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
        {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
        {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
        {email: "boy@boy.com", pass: "boy", permissions: "user"}
    ]

    const [userData, setUserData] = useState(users);
    const [curUser, setCurUser] = useState(null);
    const [otp, setOTP] = useState(0);

    const vals = {userData, setUserData, curUser, setCurUser, otp, setOTP};

    const [cardList, setCardList] = useState([
        {id: 1, title: "RomanPages Beta", desc: ""},
        {id: 2, title: "Website UI Boilerplate", desc: ""},
        {id: 3, title: "Network Project 1", desc: ""},
        {id: 4, title: "Network Project 2", desc: ""},
        {id: 5, title: "Modified Path Vector", desc: ""},
    ])

    const listVals = {cardList, setCardList};
    return (
        <UserContext.Provider value={vals}>
            <CardContext.Provider value={listVals}>
                <RouterProvider router={router}/>
            </CardContext.Provider>
        </UserContext.Provider>
    )
}

