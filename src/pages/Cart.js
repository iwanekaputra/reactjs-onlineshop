import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, numberWithCommas } from "../utils/constanta";

const Cart = ({cartByUser, loading, getCartByUser}) => {

    const [total, setTotal] = useState(0)
    const [jumlah, setJumlah] = useState(0)

    const deleteProduct = (cart) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.delete(`${API_URL}carts/${cart.id}`).then(res => {
               
            })

        getCartByUser()

    }

    const getTotal = () => {
        let result = 0;
        cartByUser.map((cart, i) => {
            setJumlah(cart.quantity)
            return result += cart.total_price
        })

        setTotal(result)
    }

    // const plus = (cart) => {
    //     console.log(cart)
    // }

    useEffect(() => {
        getTotal()
    })

  return (
    <>

    {/* <!-- Breadcrumb Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark">Home</a>
                    <a className="breadcrumb-item text-dark">Shop</a>
                    <span className="breadcrumb-item active">Shopping Cart</span>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Breadcrumb End --> */}


    {/* <!-- Cart Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover text-center mb-0">
                    <thead className="thead-dark">
                        <tr>
                            <th>Produk</th>
                            <th>Ukuran</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                    
                    {cartByUser.map(cart => {
                            return (

                        <tr key={cart.id}>
                            <td className="align-middle"><img src={cart.product.image} alt="" style={{ width: "50px" }}/> {cart.product.title}</td>
                            <td className="align-middle">{cart.size}</td>
                            <td className="align-middle">Rp. {numberWithCommas( cart.product.price)}</td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                                    {/* <div className="input-group-btn">
                                        <button className="btn btn-sm btn-primary btn-minus" >
                                        <i className="fa fa-minus"></i>
                                        </button>
                                    </div> */}
                                    <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={cart.quantity} disabled/>
                                    <div className="input-group-btn">
                                        {/* <button className="btn btn-sm btn-primary btn-plus" onClick={() => plus(cart.quantity)}>
                                            <i className="fa fa-plus"></i>
                                        </button> */}
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">Rp. {numberWithCommas(cart.total_price)}</td>
                            <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => deleteProduct(cart)}><i className="fa fa-times"></i></button></td>
                            
                        </tr>
                         )

                        })}
                        
                        
                    </tbody>
                    
                </table>
                {cartByUser.length === 0 && (
                            <div className="alert alert-dark text-center" role="alert">
                            Tidak ada produk
                          </div>
                        )}
            </div>
            <div className="col-lg-4">
                {/* <form className="mb-30" action="">
                    <div className="input-group">
                        <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                        <div className="input-group-append"/>
                            <button className="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form> */}
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>Rp. {numberWithCommas(total)}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">Gratis</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>{numberWithCommas(total)}</h5>
                        </div>
                        {cartByUser.length > 0 ? (
                            <Link to={'/checkout'}>
                            <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Checkout</button>
                            </Link>
                        ) : (
                            <Link to={'/checkout'}>
                            <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" disabled>Checkout</button>
                            </Link>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Cart End --> */}
    </>
  )
}

export default Cart;