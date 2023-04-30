import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import CardShop from "../components/CardShop";
import { API_URL, numberWithCommas, TOKEN } from "../utils/constanta";

const ShopDetail = ({user, getCartByUser, cartByUser, products}) => {

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState('')
    const [validation, setValidation] = useState([])
    const navigate = useNavigate()


    const {slug} = useParams()

    const getProduct = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        await axios.get(`${API_URL}products/${slug}`).then(res => {
            setProduct(res.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getProduct()
    }, [])

    const updateCart = async (cart) => {
        const data = {
            'product_id' : cart.product_id,
            'user_id' : cart.user_id,
            'total_price' : cart.product.price * (parseInt(quantity) + cart.quantity),
            'quantity' : parseInt(quantity) + cart.quantity,
            'size' : size
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        await axios.post(`${API_URL}carts/${cart.id}`, data).then(res => {
            swal({
                title: "Product berhasil update ke keranjang",
                icon: "success",
                button: "Close",
              });    
              setValidation()
         
        })
    }

    const addCart = async (product) => {
        const data = {
            'product_id' : product.id,
            'user_id' : user.id,
            'size' : size,
            'total_price' : product.price * parseInt(quantity),
            'quantity' : parseInt(quantity)
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        await axios.post(`${API_URL}carts`, data).then(res => {
            swal({
                title: "Product berhasil ditambahkan ke keranjang",
                icon: "success",
                button: "Close",
              });      
              setValidation()
        }).catch(error => {
            setValidation(error.response.data.error);
        })
        getCartByUser()
    }

    const addToCart = async (product) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        await axios.get(`${API_URL}carts?productId=${product.id}&userId=${user.id}&size=${size}`).then(res => {

            if(res.data.data) {
                updateCart(res.data.data)
                return;
            }

            addCart(product);
        })
        getCartByUser()
        
        
    }

    const plus = () => {
        if(quantity === product.stock) {
            return;
        }
        setQuantity(quantity + 1);
    }

    const minus = () => {
        if(quantity == 1) {
            return;
        }
        setQuantity(quantity - 1);
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
                    <span className="breadcrumb-item active">Shop Detail</span>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Breadcrumb End --> */}


    {/* <!-- Shop Detail Start --> */}
    <div className="container-fluid pb-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner bg-light">
                        <div className="carousel-item active">
                            <img className="w-100 h-100" src={product.image} alt="Image"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div className="col-lg-7 h-auto mb-30">
                <div className="h-100 bg-light p-30">
                    <h3>{product.title}</h3>
                    <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star-half-alt"></small>
                            <small className="far fa-star"></small>
                        </div>
                        <small className="pt-1">(99 Reviews)</small>
                        
                      
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">Rp. {numberWithCommas(product.price)}</h3>
                    {/* <p className="mb-4">{product.description}</p> */}
                    <p className="mb-4">Kategori : {product.category?.title}</p>
                    <div className="d-flex mb-3">
                        <strong className="text-dark mr-3">Sizes:</strong>
                        <form>
                            {product.size?.map(res => {
                                return (
                                    <>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" onChange={() => setSize(res.size)} id={`size-${res.id}`} name="size"/>
                                            <label className="custom-control-label" htmlFor={`size-${res.id}`}>{res.size}</label>
                                        </div>
                                    </>
                                )
                            })}
                            {validation?.size && (
                              <p className="text-danger">Pilih ukuran</p>
                            )}
                        </form>
                        
                    </div>
                    {/* <div className="d-flex mb-4">
                        <strong className="text-dark mr-3">Colors:</strong>
                        <form>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="color-1" name="color"/>
                                <label className="custom-control-label" htmlFor="color-1">Black</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="color-2" name="color"/>
                                <label className="custom-control-label" htmlFor="color-2">White</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="color-3" name="color"/>
                                <label className="custom-control-label" htmlFor="color-3">Red</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="color-4" name="color"/>
                                <label className="custom-control-label" htmlFor="color-4">Blue</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="color-5" name="color"/>
                                <label className="custom-control-label" htmlFor="color-5">Green</label>
                            </div>
                        </form>
                    </div> */}
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={minus}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control bg-secondary border-0 text-center" value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={plus}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                            <span className="mr-3 text-success">Stok {product.stock}</span>
              
                        <button className="btn btn-primary px-3"  onClick={() => addToCart(product)}><i className="fa fa-shopping-cart mr-1"></i> Tambah Ke keranjang</button>
                     
                    </div>
                    {/* <div className="d-flex pt-2">
                        <strong className="text-dark mr-2">Share on:</strong>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-dark px-2">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-dark px-2">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-dark px-2">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <div className="row px-xl-5">
            <div className="col">
                <div className="bg-light p-30">
                    <div className="nav nav-tabs mb-4">
                        <a className="nav-item nav-link text-dark active" data-toggle="tab" >Description</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Product Description</h4>
                            <p>{product.description}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Shop Detail End --> */}


    {/* <!-- Products Start --> */}
    <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Kamu mungkin juga suka</span></h2>
        <div className="row px-xl-5">
            <CardShop products={products} />
        </div>
    </div>
    {/* <!-- Products End --> */}


   
    </>
  )
}

export default ShopDetail;