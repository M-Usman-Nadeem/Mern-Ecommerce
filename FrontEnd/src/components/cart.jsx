import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove ,changeQuantity} from '../reducers'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Nav from './nav'

export default function Cart() {
  const cart = useSelector(state => state.rootReducer.cart)
  console.log()
  const dispatch = useDispatch()
  const removeItem = (item) => {
    dispatch(remove(item))

    toast.success("Product has been removed.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      theme: 'dark'

    })
  }
  const totalPrice = () => {
    // let totalPrice = 0;
    // cart.forEach(({ price, quantity }) => {
    //   totalPrice += price * quantity;
    //   // console.log(price,quantity)

    // })
    // return totalPrice
  return  cart.reduce((prev,current)=>prev+current.price*current.quantity,0)
  }
  return (

    <>

      <ToastContainer />


      <div className="container mb-5">
        <div className="d-flex flex-row align-items-start">
          <div className="col-8 d-flex flex-column m-2">
            {
              cart.map((item, index) => {
                const { category, name, price, rating, image } = item
                return <div key={index} className="cart-item p-3">
                  <div className="d-flex flex-row">
                    <img
                      className="col-2 img-fluid"
                      src={image}
                      alt=""
                    />
                    <div className="col-6 p-2">
                      <h5>{name}</h5>
                      <h6>{category}</h6>
                      <p>${price}</p>
                    </div>
                    <div className="col-2 p-2">
                      Quatity:
                      <select name=""  value={cart[index].quantity} onChange={(e) => dispatch(changeQuantity({index,quantity:e.target.value}))} id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </div>
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#removeItemModal"
                      className="col-2 d-flex justify-content-end align-items-start close"
                      onClick={() => removeItem(index)}
                    >
                      <i className="bi bi-x-circle" />
                    </div>
                  </div>
                </div>
              })

            }
          </div>
          <div className="col-4 order p-3 m-2">
            <h4>Order Total</h4>
            <div className="d-flex flex-row py-2">
              <input type="text" className="form-control" placeholder="promo code" />
              <button className="btn btn-primary">Apply</button>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
              <span className="billing-item">items</span>
              <span className="billing-cost">${
                totalPrice()

              }</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
              <span className="billing-item">Shipping</span>
              <span className="billing-cost">$10</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
              <span className="billing-item">Discount</span>
              <span className="billing-cost">-$10</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
              <span className="billing-item fs-5">Total</span>
              <span className="billing-cost fs-5">${totalPrice()&&totalPrice()-20}</span>
            </div>
            <div className="d-flex mt-3">
              <Link to="/Checkout" className="btn btn-primary flex-grow-1">
                Pay Now
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
