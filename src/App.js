import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <Routes>
     
     <Route path='/login' exact element={<Login/>}/> 
     <Route path='/home' exact element={<Home/>}/> 
     <Route path='/register' exact element={<Register/>}/>
     <Route path="/" element={<LandingPage />}/>
    
   </Routes>
 </Router>
    
  );
}

export default App;
