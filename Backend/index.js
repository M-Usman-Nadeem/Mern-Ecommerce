const express=require('express')
const app=express()
const mongoose=require('mongoose')
const { Schema } = mongoose;
const cors=require('cors')
app.use(cors())


  mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce').then(()=>{
      console.log('connected')
    });
    const PORT=5000;
app.listen(PORT,(err)=>{
    console.log(err||'listening to Port:'+PORT)
})
const productsData=mongoose.model('model',{},'products')

app.get('/api/products',async (req,res)=>{
    const products= await productsData.find()
console.log(products)
    res.json(products)
})
