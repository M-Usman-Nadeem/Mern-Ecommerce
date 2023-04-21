import React from 'react'
// import data from './data'
import { useSelector, useDispatch } from 'react-redux'
import {add} from '../reducers'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ProductsList() {
    const products=useSelector(state=>state.rootReducer.products)
    const dispatch=useDispatch()
    const addItem=(item)=>{
 dispatch(add({...item,quantity:1}))

toast.success("Product has been added.", {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000,
  theme:'dark'
 
})
    }
  return (
  <div className="container mb-5">
  <div id="products" className="row">
    {  

    products.map((item,index)=>{
    const {category,name,price,rating,image}=item
    return  <div className="col-xl-3 col-lg-4 col-md-6 position-relative" key={index}>
        <div className="card product-item">
            <i className="bi bi-heart-fill position-absolute liked" />
            <i className="bi bi-heart position-absolute like" />
          <Link to={`/Product/${index}`}>
          <img
            src={image}
            className="card-img-top"
            alt="..."
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Click to See Product Details"
            /></Link>
            <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted  fw-light">
          {category}
            </h6>
            <h5 className="card-title">{name}</h5>
            <p className="card-text price">
                {" "}
                ${price}{" "}
                <span className="float-end rating-stars">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                </span>{" "}
            </p>
            <div className="text-center">
                <button
                className="btn btn-dark w-100"
                onClick={()=>addItem(item)}
                >
                {" "}
                Add To Cart
                </button>
            </div>
            </div>
        </div>
        </div>
    })
    }
 </div>
</div>

  )
}
