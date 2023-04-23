import ProductsList from './components/ProductsList'
import Nav from './components/nav'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Crousel from './components/crousel'
import Footer from './components/footer';
import { useEffect } from 'react';
import { initialData } from './reducers';
import axios from 'axios'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch =useDispatch()  
  useEffect(()=>{
    async function products(){
      const productsData=await axios.get('http://127.0.0.1:5000/api/products')
      dispatch(initialData(productsData.data))
// console.log(productsData.data)
}
products()

},[])

  return (
   <>
   <Nav/>
   <Crousel/>
   <ProductsList/>
   <Footer/>

<ToastContainer/>
   </>
  )
}

export default App
