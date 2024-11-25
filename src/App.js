
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroArea from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import CheckoutForm from './pages/CheckOut';
import ProductDetail from './pages/ProductDetail';
function App() {
  return (
   
    <BrowserRouter>
     <HeroArea />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/menu/:id' element={<ProductDetail />} />




      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
