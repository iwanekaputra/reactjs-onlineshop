import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
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


const Customer = () => {

  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);

  const [refresh, setRefresh] = useState(false)
  const [cartByUser, setCartByUser] = useState([]);
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [ordersByUser, setOrdersByUser] = useState([])


  const navigate = useNavigate()

  const getUser = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}user`).then(res => {
        setUser(res.data)
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

  const getOrdersByUser = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}user`).then(res => {
     axios.get(`${API_URL}orders/user/${res.data.id}`).then(res => {
        setOrdersByUser(res.data.data)
      })
    })   
  }

  

  useEffect(() => {
    if(!localStorage.getItem('token')){ 
      navigate('/login')
      return;
    }
    getUser()
    getCategories()
    getOrdersByUser()

  }, [])

  return (
    <>
      
    </>
    
  )
}


export default Customer;