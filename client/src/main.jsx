import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginApp from './LoginApp.jsx';
import ShopApp from './ShopApp.jsx';
import './index.css';

// Error page
import Error from './pages/Error.jsx';

// Home-Main Pages
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Cart from './pages/Cart.jsx';

// Login-Signup Pages
import Login from './pages/login/Login.jsx';
import ShopSignup from './pages/login/ShopSignup.jsx';
import UserSignup from './pages/login/UserSignup.jsx';

// Shop Manager Pages
import ShopManager from './pages/shop-manager/ShopManager.jsx';
import ShopHome from './pages/shop-manager/ShopHome.jsx';
import Orders from './pages/shop-manager/Orders.jsx';
import Messages from './pages/shop-manager/Messages.jsx';
import Products from './pages/shop-manager/Products.jsx';
import NewProduct from './pages/shop-manager/NewProduct.jsx';
import Calendar from './pages/shop-manager/Calendar.jsx';
import Settings from './pages/shop-manager/Settings.jsx';
import Finances from './pages/shop-manager/Finances.jsx'

const router = createBrowserRouter([
  // Home-Main Pages
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'cart',
        element: <Cart />
      }
    ]
  },

  // Login-Signup Pages
  {
    path: 'login',
    element: <LoginApp />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'usersignup',
        element: <UserSignup />
      },
      {
        path: 'shopsignup',
        element: <ShopSignup />
      }
    ]
  },

  // Shop Manager Pages
  {
    path: 'shopmanager',
    element: <ShopApp />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <ShopManager />
      },
      {
        path: 'shophome',
        element: <ShopHome />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'messages',
        element: <Messages />
      }, 
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'newproduct',
        element: <NewProduct />
      },
      {
        path: 'finances',
        element: <Finances />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

