import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify' 
import Login from './Components/Login/Login';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';
import Main from './Components/Main/Main';
import Details from './Components/Details/Details';
import UploadDetails from './Components/UploadDetails/UploadDetails';
import Cart from './Components/Cart/Cart'
import PrivateRoute from './Components/Login/PrivateRoute';

function App() {
  return (
  <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<PrivateRoute><NavBar/></PrivateRoute>}/>
          <Route path ='/main' element={<Main/>}/>
          <Route path='/details' element={<Details/>}/>
          <Route path='/uploadDetails' element={<UploadDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
