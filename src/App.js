import { Navigate, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/Home';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import { List } from './pages/List';
import { Edit } from './pages/Edit';
import { Addproduct } from './pages/Addproduct';
import Navbar from './components/common/Navbar';

function App() {

  const ProtectRoute = ( { children } ) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token !== null && token !== undefined ? (children) : <Navigate to={`/login`} />
  }

  const PublicRoutes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    },
  ]
  const PrivateRoutes = [
    {
      path: '/add',
      component: <Addproduct />
    },
    {
      path: '/products',
      component: <List />
    },
    {
      path: '/edit/:id',
      component: <Edit />
    },
  ]
  return (
    <div className="">

      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>

          {
            PublicRoutes.map(route => {
              return (
                <Route path={route.path} element={route.component} key={route.path} />
              )
            })
          }

          {PrivateRoutes.map(route => {
            return (
              <Route path={route.path} element={<ProtectRoute>{route.component}</ProtectRoute>} key={route.path} />
            )
          })
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
