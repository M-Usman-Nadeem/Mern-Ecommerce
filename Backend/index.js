const express=require('express')
const app=express()
const mongoose=require('mongoose')
const { Schema } = mongoose;
const cors=require('cors')
app.use(cors())
app.use(express.json())

const productSchema=new Schema({
   
        category: String,
        name: String,
        price: Number,
        rating: Number,
        image: String,
        quantity:Number
     
})
  mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce').then(()=>{
      console.log('connected')
    });
    const PORT=5000;
app.listen(PORT,(err)=>{
    console.log(err||'listening to Port:'+PORT)
})
const productsData=mongoose.model('model',{},'products')
const cartProduct=mongoose.model('cart',productSchema)
app.post('/api/addToCart', async(req, res) => {
    console.log(req.body.name,req.body)
    const product=new cartProduct(req.body)
    await product.save()
    const data= await cartProduct.find()
res.json(data)
     });
  async  function getProducts(req,res){
        const cartProducts= await cartProduct.find()
        res.json(cartProducts)
     }
     app.get('/api/cartProducts', getProducts)
     app.put('/api/products/:id',async(req,res,next)=>{
        console.log(req.body)
      const product=  await cartProduct.updateOne({_id:req.params.id},{quantity:Number(req.body.quantity)})
      const updateProduct=await cartProduct.findOne({_id:req.params.id})
      res.json(updateProduct)
// next()

console.log(product)
     })
     app.delete('/api/products/:id', async(req,res,Next)=>{
        console.log(req.params.id)
        const deleteItem=await cartProduct.deleteOne({_id:req.params.id})
Next()
     }, getProducts)
    
app.get('/api/products',async (req,res)=>{
    const products= await productsData.find()
    res.json(products)
})
