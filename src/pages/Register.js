import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../utils/constanta";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validation, setValidation] = useState([])

  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault()

    if(confirmPassword !== password) {
      setValidation({confirmPassword : "Password tidak sama!"})
      setTimeout(() => {
        setValidation([])
      }, 10000)
      return
    }
    const data = {
      name,
      email,
      password
    }

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    await axios.post(`${API_URL}register`, data).then(res => {
      swal("Sukses register", "Mohon login", "success");

      navigate('/login')
    }).catch(error => {
      setValidation(error.response.data)
      setTimeout(() => {
        setValidation([])
      }, 10000)
    })

  }

  return (
    <>
    
    
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{ borderRadius: "25px" }}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-4">

                <p class="text-center h1 mb-5 mx-1 mx-md-4 mt-4 text-primary">Register</p>

                <form class="mx-1 mx-md-4" onSubmit={registerHandler}>
                {validation?.password && (
                  <div class="alert alert-danger" role="alert">
                  {validation.password}
                  </div>
                )}

                {validation?.confirmPassword && (
                  <div class="alert alert-danger" role="alert">
                  {validation.confirmPassword}
                  </div>
                )}

                {validation?.email && (
                  <div class="alert alert-danger" role="alert">
                  {validation.email}
                  </div>
                )}

                {validation?.name && (
                  <div class="alert alert-danger" role="alert">
                  {validation.name}
                  </div>
                )}
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg mt-4 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label mt-0" for="form3Example1c">Nama Lengkap</label>
                      <input type="text" id="form3Example1c" class="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg mt-4 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example3c">Email address</label>
                      <input type="email" id="form3Example3c" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg mt-4 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4c">Password</label>
                      <input type="password" id="form3Example4c" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg mt-4 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4cd">Ulangi password</label>
                      <input type="password" id="form3Example4cd" class="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </div>


                  <div class="bg-danger">
                    <button type="submit" class="btn btn-primary w-100">Register</button>
                  </div>
                  <div class="text-center mt-2">
                    <p>Sudah punya akun? <Link to="/login" className="text-decoration-none">Login</Link></p>
                  </div>

                </form>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}


export default Register;