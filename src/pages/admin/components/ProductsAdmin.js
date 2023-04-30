import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Select from 'react-select'
import swal from "sweetalert"
import { API_URL, numberWithCommas } from "../../../utils/constanta"

const ProductsAdmin = ({products, categories, sizeDress, getProducts, setProducts}) => {
  const [product, setProduct] = useState([])

  const [title, setTitle] = useState("")
  const [stock, setStock] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("")
  const [category, setCategory] = useState('')
  const [size, setSize] = useState([])
  const [newImage, setNewImage] = useState("")
  const [validation, setValidation] = useState([])

  const getProductsBySearch = async (e) => {
    if(e.length > 2) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      await axios.get(`${API_URL}products/search/${e}`).then(res => {
        setProducts(res.data.data)
      })
    } else {
      getProducts()
    }
  }

  const updateProduct = async(e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', title)
    data.append('slug', title.split(" ").join("-"))
    data.append('stock', stock)
    data.append('price', price)
    data.append('description', description)
    if(!newImage){
      data.append('image', image)
    } else {
      data.append('image', newImage)
    }
    data.append('category', category)
    data.append("size", JSON.stringify(size))

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.post(`${API_URL}products/${slug}`, data).then(res => {
        swal("Sukses", "Sukses update product", "success");
        getProducts()
      }).catch(error => {
        console.log(error.response.data)
      })
    
  }


  const deleteProduct = async(product) => {
    
      swal({
        title: "Are you sure?",
        text: "Yakin di hapus?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Sukses hapus product", {
            icon: "success",
          });
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
          axios.delete(`${API_URL}products/${product.slug}`).then(res => {
          getProducts()

          })
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  } 

  const handle = (e) => {
    setSize(e)
  }

  const getProduct = (product) => {
    setSlug(product.slug)
    setTitle(product.title)
    setStock(product.stock)
    setPrice(product.price)
    setDescription(product.description)
    setImage(product.image)
    setCategory(product.category)
    let size = product.size.map(obj => {
      obj['value'] = obj['size']; // Assign new key
      obj['label'] = obj['size'];
      // delete obj['size']; // Delete old key
      return obj;
    });

  

    
    setSize(size)
  }

  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Products</h1>
          </div>
          <div class="mb-4 d-flex justify-content-between">
          <Link to="/admin/products/create" className="btn btn-primary border-0 rounded mr-2">
            Tambah produk
          </Link>
          <div class="col-lg-2">
            <input type="text" class="form-control rounded" id="search" placeholder="Search product" onChange={(e) => getProductsBySearch(e.target.value)}/>
            </div>
          </div>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Gambar</th>
                <th scope="col">Stok</th>
                <th scope="col">Harga</th>
                <th scope="col">Kategori</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                    <tr>
                      <th scope="row" key={product.id}>{index+1}</th>
                      <td>{product.title}</td>
                      <td>
                        <img src={product.image} width="50px"/>
                      </td>
                      <td>{product.stock}</td>
                      <td>Rp. {numberWithCommas(product.price)}</td>
                      <td>{product.category?.title}</td>
                      <td className="d-flex justify-content-center" >
                        <button className="btn btn-primary border-0 rounded mr-2 btn-sm"  data-toggle="modal" data-target="#detailProduct" onClick={()=> setProduct(product)}><i class="fas fa-eye"></i></button>
                        <button className="btn btn-info border-0 rounded mr-2 btn-sm" data-toggle="modal" data-target="#updateProduct" onClick={()=> getProduct(product)}><i class="fas fa-edit"></i></button>
                        <button className="btn btn-danger border-0 rounded btn-sm" onClick={() => deleteProduct(product)}><i class="fas fa-trash"></i></button>
                      </td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </main>

        {/* <!-- Modal detail --> */}
        <div class="modal fade" id="detailProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
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
                  <div class="col-md-8">
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
                    <p className="mb-3 text-dark"><strong>Kategori :</strong> {product.category?.title}</p>
                    <p className="mb-3 text-dark"><strong>Stok :</strong> {product.stock}</p>
                    <div className="d-flex mb-3">
                        <strong className="text-dark mr-3">Sizes:</strong>
                        <form>
                          {product.size?.map(size => {
                            return <div className="custom-control custom-radio custom-control-inline">
                                      <input type="radio" className="custom-control-input"name="size" id={`size-${size.id}`} />
                                      <label className="custom-control-label">{size.size}</label>
                                  </div>
                          })}
                           
                        </form>
                    </div>
                    <p className="mb-2 text-dark"><strong>Deskripsi :</strong></p>
                    <p className="mb-3 text-dark">{product.description}</p>
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
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modal update --> */}
        <div class="modal fade" id="updateProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

              <div className="col-md-12">
                <form>
                {/* {validation?.title && (
                  <div class="alert alert-danger" role="alert">
                    {validation.title}
                  </div>
                )} */}
                
                
                
                <div class="form-group">
                  <label for="name">Nama Product</label>
                  <input type="text" class="form-control" id="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div class="form-group">
                  <label for="slug">Slug</label>
                  <input type="text" class="form-control" id="slug" value={title.split(" ").join("-")} />
                </div>
                <div class="form-group">
                  <label for="stock">Stok</label>
                  <input type="number" class="form-control" id="stock" value={stock} onChange={(e) => setStock(e.target.value)}/>
                </div>
                
                <div class="form-group">
                  <label for="price">Harga</label>
                  <input type="text" class="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="categories">Kategori</label>
                  <select class="form-control" id="categories" onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(c => {
                      if(c.title === category.title ) {
                        return <option selected>{c.title}</option>
                      }
                      return (
                        <>
                          <option>{c.title}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
                  <img src={image} width="100" class="mb-2"/>
                <div class="form-group">
                  <label for="gambar">Gambar</label>
                  <input type="file" class="form-control-file" id="gambar" onChange={(e) => setNewImage(e.target.files[0])}/>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect2">Ukuran</label>
                  <Select options={sizeDress} isMulti className="basic-multi-select" classNamePrefix="select" value={size} onChange={handle}/>

                </div>
                <Link to="/admin/products" className="btn btn-primary float-right">Kembali</Link>
                <button type="submit" class="btn btn-primary float-right mr-3 mb-5" onClick={updateProduct} data-dismiss="modal">Simpan</button>

                </form>
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}


export default ProductsAdmin