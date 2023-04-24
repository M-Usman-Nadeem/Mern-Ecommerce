import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
// import db from './components/data'
const initialState=[]
const products=createSlice({
    name:'products',
    initialState,
reducers:{
    initialData:(state,action)=>{
        return action.payload
    }
}
})
const addToCart=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        add:(state,{payload})=>{
            if(state.includes(payload)){
                return state
            }
          
            return payload
        },
        remove:(state,action)=>{
// const updatedArr= state.filter((item,index)=>index!=action.payload)


// return [...updatedArr]
return action.payload
        },
        changeQuantity:(state,{payload})=>{
const data=state.map((item,index)=>{
if(item._id!=payload._id)return item
else{
    console.log(payload)
   
    return payload

}})
// console.log('data',data)
return data
}
}
})

export const rootReducer=combineReducers({
    products:products.reducer,
    cart:addToCart.reducer
})
export const {add,remove,changeQuantity}=addToCart.actions
export const {initialData}=products.actions