const UserAdmin = ({users}) => {
  return (
    <>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">User</h1>
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
            <div className="col-lg-12">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Profile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => {
                    return (
                      <>     
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{user.profile}</td>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.role?.name}</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </main>
    </>
  )
}


export default UserAdmin;