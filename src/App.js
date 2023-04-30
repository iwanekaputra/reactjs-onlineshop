import './App.css';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ShopDetail from './pages/ShopDetail';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './utils/constanta';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Order from './pages/Order';
import Contact from './pages/Contact';
import SidebarAdmin from './pages/admin/SidebarAdmin';
import NavbarAdmin from './pages/admin/NavbarAdmin';
import ProductsAdmin from './pages/admin/components/ProductsAdmin';
import CreateProductsAdmin from './pages/admin/components/CreateProductsAdmin';
import CategoriesAdmin from './pages/admin/components/CategoriesAdmin';
import Register from './pages/Register';
import RolesAdmin from './pages/admin/RolesAdmin';
import UserAdmin from './pages/admin/UserAdmin';
import SizeAdmin from './pages/admin/SizesAdmin';
import TransactionsAdmin from './pages/admin/TransactionAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import NotFound from './pages/NotFound';

function App() {

  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  let [sizeDress, setSizeDress] = useState([]);

  const [refresh, setRefresh] = useState(false)
  const [cartByUser, setCartByUser] = useState([]);
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [ordersByUser, setOrdersByUser] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])


  const navigate = useNavigate()

  const getUser = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}user`).then(res => {
        setUser(res.data)
    })
  } 

  const getUsers = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}users`).then(res => {
        setUsers(res.data.data)
    })
  }

  const getRoles = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}roles`).then(res => {
      setRoles(res.data.data);
    }) 
  }

  const getProducts = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}products`).then(res => {
        setProducts(res.data.data);
    })
  }


  const getCartByUser = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}user`).then(res => {
      setUser(res.data)
      axios.get(`${API_URL}carts/user/${res.data.name}`).then(res => {
        setCartByUser(res.data.data)
        if(res.data.data.length === 0 ){
            setLoading(true)
            return
        }

      })
    })     
  } 

  const getCategories = async () => {
    await axios.get(`${API_URL}categories`).then(res => {
      setCategories(res.data.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getSizeDress = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}size/dress`).then(res => {
      let size = res.data.data.map(obj => {
        obj['value'] = obj['size']; // Assign new key
        obj['label'] = obj['size'];
        // delete obj['size']; // Delete old key
        return obj;
      });
      setSizeDress(size)
    }).catch(error => {
      console.log(error)
    })
  }

  const getOrdersByUser = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}user`).then(res => {
     axios.get(`${API_URL}orders/user/${res.data.id}`).then(res => {
        setOrdersByUser(res.data.data)
      })
    })   
  }

  const getOrders = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}orders`).then(res => {
      setOrders(res.data.data);
    })   
  }

  

  

  useEffect(() => {
    getUser()
    getCategories()
    getOrdersByUser()
    getProducts()
    getRoles()
    getCartByUser()
    getSizeDress()
    getOrders()
    getUsers()
  }, [])


  return (
    <>
      {user.role_id === 2 && (
        <>  
          <Navigation categories={categories} cartByUser={cartByUser} ordersByUser={ordersByUser} user={user}/>
          <Routes>
            <Route path="/" element={<Home products={products} />} /> 
            <Route path="/login" element={<Login />}  /> 
            <Route path="/shop" element={<Shop categories={categories} />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/order" element={<Order />} ordersByUser={ordersByUser}  user={user}  /> 
            <Route path="/success" element={<Success />}  /> 
            <Route path="/cart" element={<Cart cartByUser={cartByUser} loading={loading} getCartByUser={getCartByUser}  />} total={total} /> 
            <Route path="/shop/:slug" element={<ShopDetail user={user} getCartByUser={getCartByUser} cartByUser={cartByUser} products={products} />} /> 
            <Route path="/checkout" element={<Checkout user={user} cartByUser={cartByUser} getCartByUser={getCartByUser} getOrdersByUser={getOrdersByUser} />}  /> 
          <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}

      

      {user.role_id === 1 && (
        <>
        <NavbarAdmin />
        <SidebarAdmin />
        <Routes>
          <Route path="/login" element={<Login />}  /> 
          <Route path="/admin/products" element={<ProductsAdmin products={products} categories={categories} sizeDress={sizeDress} getProducts={getProducts} setProducts={setProducts}/>} />
          <Route path="/admin/products/create" element={<CreateProductsAdmin categories={categories} sizeDress={sizeDress} getProducts={getProducts} />} />
          <Route path="/admin/categories" element={<CategoriesAdmin categories={categories} getCategories={getCategories} />} />
          <Route path="/admin/roles" element={<RolesAdmin users={users} roles={roles} getUsers={getUsers} />} />
          <Route path="/admin/users" element={<UserAdmin users={users} roles={roles} getUsers={getUsers} />} />
          <Route path="/admin/transactions" element={<TransactionsAdmin getOrders={getOrders}  orders={orders} setOrders={setOrders} />} />
          <Route path="/admin/sizes" element={<SizeAdmin sizeDress={sizeDress} getSizeDress={getSizeDress} />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin orders={orders} products={products}/>} />
        </Routes>
        </>
      )}

  {!localStorage.getItem('token') && (
        <>
        <Navigation categories={categories} cartByUser={cartByUser} ordersByUser={ordersByUser} user={user}/>

        <Routes>
          <Route path="/" element={<Home products={products} />} /> 
          <Route path="/login" element={<Login />}  /> 
          <Route path="/register" element={<Register />}  /> 
          <Route path="/shop" element={<Shop categories={categories} />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/shop/:slug" element={<ShopDetail user={user} getCartByUser={getCartByUser} cartByUser={cartByUser} />} /> 
          <Route path='*' element={<Login />} />
        </Routes>
        </>
      )}

      
    </>
  );
}

export default App;
