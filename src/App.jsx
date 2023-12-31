import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Banner from './components/Banner/Banner'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Error404 from './components/404/404'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import Contacto from './components/Contacto/Contacto';
import { CartContextProvider } from './Context'
import './reset.css'

function App() {

  return (

    <CartContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Banner/><ItemListContainer/></>} />
          <Route path="/category/:categoryId" element={<><Banner/><ItemListContainer/></>} />
          <Route path="/product/:id" element={<ItemDetailContainer/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>      
        <Footer /> 
      </BrowserRouter>
    </CartContextProvider>

  )
  
}

export default App;