import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL, numberWithCommas } from "../utils/constanta";

const Checkout = ({user, cartByUser, getCartByUser, getOrdersByUser}) => {

    const [noHp, setNoHp] = useState(0);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [address, setAddress] = useState('');
    const [cartId, setCartId] = useState([])
    const [total, setTotal] = useState();
    const [ongkir, setOngkir] = useState(20000)
    const [payment, setPayment] = useState('COD')

    const navigate = useNavigate()


    const getTotal = () => {
        let result = 0;
        cartByUser.map((cart, i) => {
            return result += cart.total_price
        })

        setTotal(result)
    }

    useEffect(() => {
        getTotal()
    })

    const checkout = async () => {
        const no_order = `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}${user.id}${(Math.random() + 1).toString(36).substring(7)}`
        const data = {
            cart_id : cartByUser,
            user_id : user.id,
            nohp : noHp,
            city : city,
            province : province,
            address : address,
            total : total,
            ongkir : ongkir,
            payment : payment,
            no_order : no_order,
            total_pay : total
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        await axios.post(`${API_URL}orders`, data).then(res => {
            if(res.status === 200) {
                cartByUser.map(res => {
                    return axios.delete(`${API_URL}carts/${res.id}`).then(res => {
                        getCartByUser()
                        getOrdersByUser()
                    })
                })
               
            }
        })

        navigate('/success')
    }

  return (
    <>
    {/* <!-- Breadcrumb Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark">Home</a>
                    <a className="breadcrumb-item text-dark">Shop</a>
                    <span className="breadcrumb-item active">Checkout</span>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Breadcrumb End --> */}


    {/* <!-- Checkout Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label>Username</label>
                            <input className="form-control" type="text" placeholder={user.name} disabled />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>E-mail</label>
                            <input className="form-control" type="text" placeholder={user.email} disabled />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>No Handphone</label>
                            <input className="form-control" type="text" placeholder="+123 456 789" onChange={(e) => setNoHp(e.target.value)} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Kota</label>
                            <select className="custom-select" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option selected>United States</option>
                                <option>Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                            </select>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Province</label>
                            <select className="custom-select" value={province} onChange={(e) => setProvince(e.target.value)}>
                                <option selected>United States</option>
                                <option>Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                            </select>
                        </div>
                        <div className="col-md-12 form-group">
                            <label>Alamat</label>
                            <textarea className="w-100 h-100" value={address} onChange={(e) => setAddress(e.target.value)}>asda</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom">
                        <h6 className="mb-3">Products</h6>
                        {cartByUser.map(cart => {
                            return  <div key={cart.id} className="d-flex justify-content-between">
                                        <p>{cart.product.title}</p>
                                        <p>Rp. {numberWithCommas(cart.product.price)} x {cart.quantity}</p>
                                        
                                    </div>
                        })}
                       
                        
                    </div>
                    <div className="border-bottom pt-3 pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>Rp. {numberWithCommas(total)}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">Rp. {numberWithCommas(ongkir)}</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>Rp. {numberWithCommas(total + ongkir)}</h5>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                    <div className="bg-light p-30">
                        {/* <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                <label className="custom-control-label" for="paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="directcheck"/>
                                <label className="custom-control-label" for="directcheck">Direct Check</label>
                            </div>
                        </div> */}
                         <div className="form-group mb-4">
                            <label>Province</label>
                            <select className="custom-select" value={payment} onChange={(e) => setPayment(e.targe.value)}>
                                <option selected>COD</option>
                            </select>
                        </div>
                        <button className="btn btn-block btn-primary font-weight-bold py-3" onClick={checkout}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Checkout End --> */}
    </>
  )
}

export default Checkout;