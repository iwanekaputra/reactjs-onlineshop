import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Select from 'react-select'
import swal from "sweetalert";
import { API_URL } from "../../../utils/constanta";

const CreateProductsAdmin = ({categories, sizeDress, getProducts}) => {

  const [title, setTitle] = useState('')
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("")
  const [category, setCategory] = useState('')
  const [size, setSize] = useState([])
  const [validation, setValidation] = useState([])
  
  
  const navigate = useNavigate()

  const handle = (e) => {
    setSize(e)
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('image', image)
    data.append('title', title)
    data.append('slug', title.split(" ").join("-"))
    data.append('stock', stock)
    data.append('price', price)
    data.append('description', description)
    data.append('category', category)
    data.append('size', JSON.stringify(size))


    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`${API_URL}products`, data).then(res => {
      swal("Sukses", "Sukses tambah product", "success");
      navigate('/admin/products')
      getProducts()
    }).catch(error => {
      setValidation(error.response.data)

      setTimeout(() => {
        setValidation([]);

      }, 10000)
    })
  }
  
  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Tambah Product</h1>
          </div>
          
          <div className="col-md-6 mt-5">
            <form>
            {validation?.title && (
              <div class="alert alert-danger" role="alert">
                {validation.title}
              </div>
            )}
            
            {validation?.slug && (
              <div class="alert alert-danger" role="alert">
                {validation.slug}
              </div>
            )}

            {validation?.stock && (
              <div class="alert alert-danger" role="alert">
                {validation.stock}
              </div>
            )}

            {validation?.price && (
              <div class="alert alert-danger" role="alert">
                {validation.price}
              </div>
            )}

            {validation?.category && (
              <div class="alert alert-danger" role="alert">
                {validation.category}
              </div>
            )}

            {validation?.image && (
              <div class="alert alert-danger" role="alert">
                {validation.image}
              </div>
            )}

            {validation?.description && (
              <div class="alert alert-danger" role="alert">
                {validation.description}
              </div>
            )}
            
            <div class="form-group">
              <label for="name">Nama Product</label>
              <input type="text" class="form-control" id="name" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div class="form-group">
              <label for="slug">Slug</label>
              <input type="text" class="form-control" id="slug" value={title.split(" ").join("-")}  disabled/>
            </div>
            <div class="form-group">
              <label for="stock">Stok</label>
              <input type="number" class="form-control" id="stock" onChange={(e) => setStock(e.target.value)} />
            </div>
            
            <div class="form-group">
              <label for="price">Harga</label>
              <input type="text" class="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div class="form-group">
              <label for="categories">Kategori</label>
              <select class="form-control" id="categories" onChange={(e) => setCategory(e.target.value)}>
                <option>-----Pilih kategori------</option>
                {categories.map(category => {
                  return (
                    <>
                      <option>{category.title}</option>
                    </>
                  )
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="gambar">Gambar</label>
              <input type="file" class="form-control-file" id="gambar" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect2">Ukuran</label>
              <Select options={sizeDress} isMulti className="basic-multi-select" classNamePrefix="select" onChange={handle}/>

            </div>
            <Link to="/admin/products" className="btn btn-primary float-right">Kembali</Link>
            <button type="submit" class="btn btn-primary float-right mr-3 mb-5" onClick={addProduct}>Simpan</button>

            </form>
          </div>
        </main>

        
    </>
  )
}

export default CreateProductsAdmin;