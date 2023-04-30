import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../utils/constanta";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([])
  const [validation, setValidation] = useState("")
  const navigate = useNavigate('/');
  
  const loginHandler = async (event) => {
    event.preventDefault()
    const data = {
      email,
      password
    }
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      await axios.post(`${API_URL}login`, data).then(res => {
        console.log("oke");
      if(res.data.access_token !== undefined) {
        localStorage.setItem('token', res.data.access_token)
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
      axios.get(`${API_URL}user`).then(res => {
        setUser(res.data)
        if(res.data.role_id === 1) {
          window.location.reload();
          navigate('/admin/dashboard')
          window.location.reload();
          return;
        }

        if(res.data.role_id === 2) {
          window.location.reload();
          navigate('/')
          window.location.reload();
          return
        }
        
      }).catch(error => {

        
      })
    }).catch(error => {
      if(!error.response.data?.message) {
        setValidation(error.response.data)
        setTimeout(() => {
          setValidation([])
        }, 10000)
        return
      } 

      setValidation({error : "Email atau password salah!"})
      setTimeout(() => {
        setValidation([])
      }, 10000)
    })

  }


  

  useEffect(() => {
    if(localStorage.getItem('token')) {
      if(user.role_id === 1) {
        console.log(user)
        navigate('/admin')
      }

      if(user.role_id === 2) {
        navigate('/')
      }

    }
  }, [])

  return (
    <>
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{ borderRadius: "25px" }}>
          <div class="card-body p-md-5">
            <div className="row d-flex justify-content-center">
            <div className="col-lg-4">
              <p class="text-center h1 mb-5 mx-1 mx-md-4 mt-4 text-primary">Login</p>
                  {console.log(validation)}
                  {validation?.email && (
                     <div class="alert alert-danger" role="alert">
                     {validation?.email}
                   </div>
                  )}
                  {validation?.password && (
                     <div class="alert alert-danger" role="alert">
                     {validation?.password}
                   </div>
                  )}
                  {validation?.error && (
                     <div class="alert alert-danger" role="alert">
                     {validation?.error}
                   </div>
                  )}
                  {/* <!-- Email input --> */}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="email">Email address</label>
                    <input type="email" id="email" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="password">Password</label>
                    <input type="password" id="password" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                  </div>

                

                  {/* <!-- Submit button --> */}
                  <button class="btn btn-primary btn-block mb-4" onClick={loginHandler}>Sign in</button>      

                   <div class="text-center mt-2">
                    <p>Belum punya akun? <Link to="/register" className="text-decoration-none">Register</Link></p>
                  </div>     
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Login