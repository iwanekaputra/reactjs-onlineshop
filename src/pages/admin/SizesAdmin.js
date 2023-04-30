import axios from "axios"
import { useState } from "react";
import swal from "sweetalert";
import { API_URL } from "../../utils/constanta"

const SizeAdmin = ({sizeDress, getSizeDress}) => {

  const [size, setSize] = useState('')
  const [dataSize, setDataSize] = useState([])
  const [updateSize, setUpdateSize] = useState("")

    const deleteSize = async (size) => {
      swal({
        title: "Are you sure?",
        text: "Yakin mau dihapus?!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Sukses hapus size", {
            icon: "success",
          });
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
          axios.delete(`${API_URL}size/dress/${size.id}`).then(res => {
            getSizeDress()
          }).catch(error => {
            console.log(error)
          })
        }
      });

    }

    const editHandler = (size) => {
      setDataSize(size)
      setUpdateSize(size.size)
    }

    const addSize = async () => {
      const data = {
        size
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      await axios.post(`${API_URL}size/dress`, data).then(res => {
        swal("Sukses!", "Berhasil tambah size", "success");
        getSizeDress()
        setSize('')
      }).catch(error => {
  
      })
    }

    const updateSizeHandler = async () => {
      const data = {
        size : updateSize
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.post(`${API_URL}size/dress/${dataSize.id}`, data).then(res => {
        swal("Sukses", "Sukses update size", "success");
        getSizeDress()
      })
    }

 

    
  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Sizes</h1>
          </div>

          <div className="row">
            <div className="col-lg-2">
            <button className="btn btn-primary border-0 rounded mr-2" data-toggle="modal" data-target="#createSize">
              Tambah Size
            </button>
            </div>
          </div>
          {/* {validation && (
             <div class="alert alert-danger mt-4 col-lg-4" role="alert">
             {validation.title}
             <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => setValidation()}>
              <span aria-hidden="true">&times;</span>
            </button>
           </div>
          )} */}
         

          <div className="row mt-3">
            <div className="col-lg-4">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Size</th>
                    <th scope="col" className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeDress.map((size, i) => {
                    return (
                      <>     
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{size.size}</td>
                          <td className="d-flex justify-content-center" >
                            <button className="btn btn-info border-0 rounded mr-2 btn-sm" data-toggle="modal" data-target="#editSize" onClick={() => editHandler(size)}><i class="fas fa-edit"></i></button>
                            <button className="btn btn-danger border-0 rounded btn-sm" onClick={() => deleteSize(size)}><i class="fas fa-trash"></i></button>
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

      {/* <!-- Modal create size --> */}
      <div class="modal fade" id="createSize" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Size</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="size">Size</label>
                  <input type="text" class="form-control" onChange={(e) => setSize(e.target.value)}/>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={addSize}>Simpan</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      {/* modal button create */}


      {/* <!-- Modal edit size --> */}
      <div class="modal fade" id="editSize" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <input type="text" class="form-control"id="title" value={updateSize} onChange={(e) => setUpdateSize(e.target.value)} />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={updateSizeHandler}>Update</button>
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

export default SizeAdmin;