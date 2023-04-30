import axios from "axios"
import { useEffect, useState } from "react"
import swal from "sweetalert"
import { API_URL } from "../../utils/constanta"

const RolesAdmin = ({users, roles, getUsers}) => {
  const [user, setUser] = useState([])
  const [role, setRole] = useState("")

  
  const updateHandler = async (user) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    await axios.post(`${API_URL}users/${user.id}`, {
      role
    }).then(res => {
      swal({
        title: "Berhasil update role",
        icon: "success",
        button: "Close",
      });   

      getUsers()
    })
  }
  return (
    <>
       <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Roles</h1>
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
                    <th scope="col">Nama</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => {
                    return (
                      <>     
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{user.name}</td>
                          {user.role_id === 1 ? (
                            <td><span class="badge badge-primary rounded">{user.role?.name}</span></td>
                            ) : (
                              <td><span class="badge badge-success rounded">{user.role?.name}</span></td>
                          )}
                          <td className="d-flex justify-content-center" >
                            <button className="btn btn-info border-0 rounded mr-2 btn-sm" data-toggle="modal" data-target="#editRole" onClick={() => setUser(user)}><i class="fas fa-edit"></i></button>
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



      {/* <!-- Modal edit role --> */}
      <div class="modal fade" id="editRole" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Role</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Roles</label>
                  <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => setRole(e.target.value)}>
                    {roles.map(role => {
                      if(user.role?.name === role.name) {
                       return <option selected>{role.name}</option>
                      }
                      return <option>{role.name}</option>
                    })}
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button type="submit" class="btn btn-primary"  data-dismiss="modal" onClick={() => updateHandler(user)}>Update</button>
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


export default RolesAdmin;