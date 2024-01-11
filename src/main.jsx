import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './MainFile/Main';
import Home from './HomePage/Home';
import Login from './HomePage/Login';
import AuthProvide from './AuthProvide/AuthProvide';
import Register from './Register';

import Bookservice from './HomePage/Bookservice/Bookservice';
import Bookings from './HomePage/Services/Bookings';
import PrivateRoute from './AuthProvide/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/book/:id',
        element: <PrivateRoute><Bookservice></Bookservice></PrivateRoute>,
        loader: ({params})=> fetch(`https://car-doctor-server-pi-eight.vercel.app/services/${params.id}`)
      },
      {
        path: 'bookings',
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <React.StrictMode>
    <AuthProvide><RouterProvider router={router} /></AuthProvide>
  </React.StrictMode>
  </div>
)
