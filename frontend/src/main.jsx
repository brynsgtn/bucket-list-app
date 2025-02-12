import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import store from './store.js';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import BucketList from './pages/BucketList.jsx';
import Profile from './pages/Profile.jsx';
import Users from './pages/Users.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/bucket' element={<BucketList />} />
      {/* Private Routes */}
      {/* <Route path='' element={<PrivateRoute />}> */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/users' element={<Users />} />
      {/* </Route> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>

)
