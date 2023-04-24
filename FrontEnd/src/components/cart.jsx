import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove ,changeQuantity,add} from '../reducers'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Nav from './nav'
import axios from 'axios'
export default function Cart() {
  const cart = useSelector(state => state.rootReducer.cart)
  const dispatch=useDispatch()

  useEffect(()=>{
    async function getProducts(){
      const  res= await axios.get('http://localhost:5000/api/cartProducts')
  dispatch(add(res.data))
  // console.log(res.data) 
  
    }
    getProducts()
  },[])
  const removeItem = async(id) => {
   const res=await axios.delete(`http://localhost:5000/api/products/${id}`)

    dispatch(remove(res.data))



  }
  const updateQuantity=async(quantity,id)=>{
    const res= await axios.put(`http://localhost:5000/api/products/${id}`,{
      quantity
    })
    // console.log(res.data)
    dispatch(changeQuantity(res.data))
  }
  const totalPrice = () => {
   
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
                const { category, name, price, rating, image,_id } = item
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
                      <select name=""  value={cart[index].quantity} onChange={(e) =>updateQuantity(e.target.value,_id)} id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </div>
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#removeItemModal"
                      className="col-2 d-flex justify-content-end align-items-start close"
                      onClick={() => removeItem(_id)}
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
