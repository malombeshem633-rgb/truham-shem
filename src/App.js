
import { BrowserRouter, Link , Route, Routes } from 'react-router-dom';
import './App.css';
import Addproducts from './components/Addproducts';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <h1>Atlas Electronics!!!</h1>
      </header>

      <nav>
        <Link to = '/signup' className='navlinks'>Sign Up</Link>
        <Link to = '/signin' className='navlinks'>Sign In</Link>
        <Link to = '/addproduct' className='navlinks'>Add Products</Link>
     
      </nav>

      <Routes>
        <Route path='/signup' element ={ <Signup/>}/>
        <Route path= '/signin' element ={<Signin/>}/>
        <Route path='/addproduct' element = {<Addproducts/>}/>
        <Route path ='/' element = { <Getproduct/>}/>
        <Route path='/makepayment' element = {<Makepayment/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
