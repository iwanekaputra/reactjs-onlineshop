import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, numberWithCommas } from "../utils/constanta";

const Order = ({user}) => { 
  const [ordersByUser, setOrdersByUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    console.log('order')
    if(!localStorage.getItem('token')) {
      navigate('/login')
      return 
    }

    const getOrdersByUser = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      await axios.get(`${API_URL}user`).then(res => {
       axios.get(`${API_URL}orders/user/${res.data.id}`).then(res => {
          setOrdersByUser(res.data.data)
        })
      })   
    }  

    getOrdersByUser()
  }, [])
  
  return <>
  <div className="container-fluid">
      <div className="row px-xl-5">
          <div className="col-12">
              <nav className="breadcrumb bg-light mb-30">
                  <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                  <Link className="breadcrumb-item text-dark" to="/shop">Shop</Link>
                  <span className="breadcrumb-item active">Order</span>
              </nav>
          </div>
      </div>
  </div>
  {/* <!-- Breadcrumb End --> */}

  {/* <!-- Cart Start --> */}
  <div className="container-fluid">
      <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
              {ordersByUser.map(order => {
            return <div className="bg-light p-4 mb-30">
                    <ul class="list-group">
                  
                     <div className="d-flex">
                      <div className="col-md-5">
                      <p className="text-primary">NO PESANAN : {order.no_order}</p>

                      </div>
                      <span className="col-md-7 text-right d-flex justify-content-end align-items-center">
                            <p className="text-danger">Pesanan anda sedang {order.status.name}</p>
                      </span>
                
                     </div>
                      {order.detail.map(detail => {
                        return (
                          <>
                        <li class="list-group-item d-flex">
                          <img src={detail?.product.image} style={{ width: "90px" }} />
                          <div className="col-md-6">
                            <span>{detail?.product.title}</span>
                            <p>Kategori : {detail?.product.category?.title}</p>
                            <span>x{detail.quantity}</span>
                          </div>
                          <span className="col-md-5 text-right d-flex justify-content-end align-items-center">
                            <p>Rp. {numberWithCommas(detail.product.price)}</p>
                          </span>
                        </li>
                        </>
                        )
                      })}
                    </ul>
                    <div className="d-flex justify-content-end">
                      <p className="mr-3" style={{ fontSize : "25px" }}>Total Pesanan : <span className="text-primary">Rp. {numberWithCommas(parseInt(order.total_pay) + parseInt(order.ongkir))}</span></p>
                    </div>
                  </div>
              })}

              {ordersByUser.length === 0 && (
                <div class="alert alert-dark" role="alert">
                <h5 className="text-center">Tidak ada pesanan</h5>
              </div>
              )}
             
              
              
          </div>
          <div className="col-lg-4">
             
              
          </div>
      </div>
  </div>
  {/* <!-- Cart End --> */}
  </>
}


export default Order;