import axios from "axios";
import { useNavigate } from "react-router";
import { API_URL } from "../../utils/constanta";

const NavbarAdmin = () => {

  const navigate = useNavigate()

  const logout = async () => {

    localStorage.removeItem('token');
    // window.location.reload();
    navigate('/login')
    window.location.reload();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    // await axios.post(`${API_URL}logout`).then(res => {
    //   localStorage.removeItem('token');
    // })
  }

  return (
    <>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
                    <span className="h3 text-uppercase text-primary bg-dark px-2">Wan</span>
                    <span className="h3 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
        </a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <div class="btn-group">
                                <span class="dropdown-toggle px-0 ml-3 text-primary" data-toggle="dropdown" aria-expanded="false">
                                    Hi, iwanekapuara
                                </span>
                                <span className="text-primary ml-3" onClick={logout}>
                                  <i class="fas fa-sign-out-alt"></i>
                                </span>
                                </div>
          </li>
        </ul>
      </nav>
      
    </>
  )
}

export default NavbarAdmin;