import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Session from './pages/Session';
import Campaign from './pages/Campaign';
import Segment from './pages/Segment';
import Shopify from './pages/Shopify';
import ShopifyLogin from './pages/ShopifyLogin';
import Landing from './pages/Landing';






function App() {

  return (
    
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/login" element={<Home/>} />
        <Route exact path="/session" element={<Session /> } />
        <Route exact path="/campaign" element={ <Campaign/>} />
        <Route exact path="/segment" element={ <Segment/>} />
        <Route exact path='/shopify' element={ <Shopify/> } />
        <Route exact path='/shopify-login' element={ <ShopifyLogin/> } />
      </Routes>
    </BrowserRouter>


    </div>
  );
}

export default App;
