import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
// components
import Login from './components/account/Login.jsx';
import DataProvider from './context/dataProvider';
import Home from './components/home/Home';
import Sidenav from './components/navbar/sidenav.jsx';
import Createpost from './components/create/Createpost.jsx';
import Detailpost from './components/postdetails/Detailpost';
import Updatepost from './components/create/Updatepost'
import Allpost from './components/home/posts/Allpost';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ?
    <>
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false)
  
  const [mode, setMode] = useState('nt')
  const togglenav = (n) => {
    if(n===0) setMode('nt') 
    else setMode('t')
  }

  return (
    <DataProvider>
      <BrowserRouter>
        <Sidenav mode={mode} />
        <Routes>
          <Route path='/' element={<Home togglenav={togglenav} />} />
          {/* </Route> */}
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} togglenav={togglenav}/>} />

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/create' element={<Createpost togglenav={togglenav}/>} />
          </Route>

          <Route path='/detail/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/detail/:id' element={<Detailpost togglenav={togglenav}/>} />
          </Route>

          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/update/:id' element={<Updatepost togglenav={togglenav}/>} />
          </Route>

          <Route path='/allpost' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/allpost' element={<Allpost togglenav={togglenav} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
