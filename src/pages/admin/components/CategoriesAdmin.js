import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../../utils/constanta";

const CategoriesAdmin = ({categories, getCategories}) => {

  const [title, setTitle] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [validation, setValidation] = useState();
  const [category, setCategory] = useState([])

  const addCategory = async (e) => {
    e.preventDefault()
    const data = {
      title
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    await axios.post(`${API_URL}categories`, data).then(res => {
      setValidation()
      getCategories()
      setTitle('')

      swal("Sukses", "Berhasil Tambah kategori", "success");

    }).catch(error => {
      setValidation(error.response.data);
    })
  }


  const updateCategory = async () => {

    const data = {
      title : updateTitle
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    await axios.post(`${API_URL}categories/${category.id}`, data).then(res => {
      swal("Sukses", "Berhasil diupdate", "success");
      getCategories()
      setTitle('')
    }).catch(error => {
      setValidation(error.response.data)
    })
  }

  const deleteCategory = async (category) => {

    swal({
      title: "Are you sure?",
      text: "Yakin mau di hapus??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        axios.delete(`${API_URL}categories/${category.id}`).then(res => {
          getCategories()
        })
        swal("Sukses dihapus", {
          icon: "success",
        });
      }
    });
   
  }


  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Kategori</h1>
          </div>

          <div className="row">
            <div className="col-lg-2">
            <button className="btn btn-primary border-0 rounded mr-2" data-toggle="modal" data-target="#create">
              Tambah kategori
            </button>
            </div>
          </div>
          {validation && (
             <div class="alert alert-danger mt-4 col-lg-4" role="alert">
             {validation.title}
             <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => setValidation()}>
              <span aria-hidden="true">&times;</span>
            </button>
           </div>
          )}
         

          <div className="row mt-3">
            <div className="col-lg-4">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, i) => {
                    return (
                      <>     
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{category.title}</td>
                          <td className="d-flex justify-content-center" >
                            <button className="btn btn-info border-0 rounded mr-2 btn-sm" data-toggle="modal" data-target="#edit" onClick={() => {setCategory(category) 
                              setUpdateTitle(category.title)}}><i class="fas fa-edit"></i></button>
                            <button className="btn btn-danger border-0 rounded btn-sm" onClick={() => deleteCategory(category)}><i class="fas fa-trash"></i></button>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </main>


        {/* <!-- Modal create category --> */}
        <div class="modal fade" id="create" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Kategori</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="title">Nama</label>
                  <input type="text" class="form-control" value={title} id="title" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={addCategory}>Simpan</button>
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      {/* modal button create */}

      {/* <!-- Modal edit category --> */}
      <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Kategori</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="title">Nama</label>
                  <input type="text" class="form-control" value={updateTitle} id="title" onChange={(e) => setUpdateTitle(e.target.value)}/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={updateCategory}>Update</button>
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      {/* modal button create */}
    </>
  )
}

export default CategoriesAdmin;