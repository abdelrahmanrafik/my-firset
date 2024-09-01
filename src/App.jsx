import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Components/Cart/Cart';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import { Toast } from 'bootstrap/dist/js/bootstrap.min';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import ProtectRoute from './Components/ProtcetRoute/ProtectRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Payment from './Components/Payment/Payment';
import AllOrder from './Components/AllOrders/AllOrder';

function App() {
  const x = new QueryClient()
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        {path:"/", element: <Login />},
        {path:"/home", element: <ProtectRoute><Home /></ProtectRoute>},
        { path: "/cart", element: <ProtectRoute><Cart /></ProtectRoute> },
        {path: "/productDetails/:id", element: <ProtectRoute><ProductDetails /></ProtectRoute>},
        { path: "/categories", element: <ProtectRoute><Categories /></ProtectRoute> },
        { path: "/payment", element: <ProtectRoute><Payment /></ProtectRoute> },
        {path: "/allorders", element: <ProtectRoute><AllOrder/></ProtectRoute>},
        { path: "/brands", element: <ProtectRoute><Brands /></ProtectRoute> },
        {path: "/register", element: <Register/>}
    ]}
])

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <CartContextProvider>
          <Toaster/>
          <RouterProvider router={router}/>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
