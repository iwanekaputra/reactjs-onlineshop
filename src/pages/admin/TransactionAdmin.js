import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { API_URL, numberWithCommas } from "../../utils/constanta";

const TransactionsAdmin = ({orders, getOrders, setOrders}) => {

  const [order, setOrder] = useState([])
  const [status, setStatus] = useState([])
  const [updateStatus, setUpdateStatus] = useState("")

  const getStatus = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.get(`${API_URL}status`).then(res => {
      setStatus(res.data.data);
    })   
  }

  const getOrdersBySearch = async (e) => {
    if(e.length > 2) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      await axios.get(`${API_URL}orders/search/${e}`).then(res => {
        setOrders(res.data.data)
      })
    } else {
      getOrders()
    }
  }

  const updateStatusHandler = async () => {

    const data = {
      status : updateStatus
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    await axios.post(`${API_URL}orders/${order.id}`, data).then(res => {
      swal("Sukses!", "Berhasil update status", "success");
      getOrders()
    })   
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Transactions</h1>
          </div>
          <div class="mb-4 d-flex justify-content-end">
          <div class="col-lg-2">
            <input type="text" class="form-control rounded" id="search" placeholder="Search pesanan" onChange={(e) => getOrdersBySearch(e.target.value)} />
            </div>
          </div>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">No pesanan</th>
                <th scope="col">Customer</th>
                <th scope="col">Total bayar</th>
                <th scope="col">Tanggal Transaksi</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                    <tr>
                      <th scope="row" key={order.id}>{index+1}</th>
                      <td>{order.no_order}</td>
                      <td>{order.user?.name}</td>
                      <td>Rp. {numberWithCommas(order.total_pay)}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      {order.status?.id === 1 && (
                        <td class="text-danger">{order.status?.name}</td>
                      )}

                      {order.status?.id === 2 && (
                        <td class="text-primary">{order.status?.name}</td>
                      )}
                      {order.status?.id === 3 && (
                        <td class="text-success">{order.status?.name}</td>
                      )}
                      <td className="d-flex justify-content-center" >
                        <button className="btn btn-primary border-0 rounded mr-2 btn-sm"  data-toggle="modal" data-target="#detailOrder" onClick={() => setOrder(order)}><i class="fas fa-eye"></i></button>
                        <button className="btn btn-info border-0 rounded mr-2 btn-sm" data-toggle="modal" data-target="#updateOrder" onClick={() => setOrder(order)}><i class="fas fa-edit"></i></button>
                        {/* <button className="btn btn-danger border-0 rounded btn-sm" onClick={() => deleteProduct(product)}><i class="fas fa-trash"></i></button> */}
                      </td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </main>


          {/* modal detail order */}
        <div class="modal fade" id="detailOrder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">No Pesanan: {order.no_order}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
              {order.detail?.map(detail => {
                        return (
                          <>
                        <li class="list-group-item d-flex">
                          <img src={detail?.product.image} style={{ width: "90px" }} />
                          <div className="col-md-6">
                            <span>{detail?.product.title}</span>
                            <p>Kategori : {detail?.product.category?.title}</p>
                            <span>x{detail.quantity}</span>
                            <span> {detail.size}</span>
                          </div>
                          <span className="col-md-5 text-right d-flex justify-content-end align-items-center">
                            <p>Rp. {numberWithCommas(detail.product.price)}</p>
                          </span>
                        </li>
                        </>
                        )
                      })}
                      </div>
                      <div class="row justify-content-between">
                        <div className="col-lg-6">
                        <div class="mt-2">
                            <h6 class="text-primary">Kirim ke : </h6>
                            <p>{order.address}, {order.city}, {order.province}</p>
                          </div>
                        </div>
                        <div class="col-lg-6 ">
                        
                          <div class="d-flex justify-content-between mt-2">
                            <h6 class="text-primary">Total Harga : </h6>
                            <h6>Rp. {numberWithCommas(order.total_pay)}</h6>
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                            <h6 class="text-primary">Ongkir : </h6>
                            <h6>Rp. {numberWithCommas(order.ongkir)}</h6>
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                            <h6 class="text-primary">Metode Pembayaran : </h6>
                            <h6>COD</h6>
                          </div>
                          <div class="d-flex justify-content-between mt-2">
                            <h6 class="text-primary">Total bayar : </h6>
                            <h6>Rp. {numberWithCommas(parseInt(order.total_pay) + parseInt(order.ongkir))}</h6>
                          </div>
                        </div>
                      </div>
              </div>
            </div>
          </div>
        </div>


        {/* modal update order */}

        {/* modal detail order */}
        <div class="modal fade" id="updateOrder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">No Pesanan: {order.no_order}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <form>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => setUpdateStatus(e.target.value)}>
                      {/* {console.log(status)} */}
                      {status?.map(stat => {
                        if(stat.name === order.status?.name) {
                          return <option selected>{stat.name}</option>
                        }
                        return <option>{stat.name}</option>
                      })}
                    </select>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={updateStatusHandler}>Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default TransactionsAdmin;