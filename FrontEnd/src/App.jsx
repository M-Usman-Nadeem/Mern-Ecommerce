import ProductsList from './components/ProductsList'
import Nav from './components/nav'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Crousel from './components/crousel'
import Footer from './components/footer';
function App() {


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
