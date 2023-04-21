import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux'
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import Product from './components/product';
import ProductDescription from './pages/productDescription';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:'/Cart',
    element:<CartPage/>
  },
  {
    path:'/Checkout',
    element:<CheckOutPage/>
  },
  
  {
    path:'/Product/:id',  
    element:<ProductDescription/>
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);