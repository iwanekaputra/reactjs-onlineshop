import { Link, useLocation, useNavigate } from "react-router-dom";
import ListCategories from "./ListCategories";

const Navigation = ({categories, cartByUser, ordersByUser}) => {

    const location = useLocation()
    const {pathname} = location
    const navigate = useNavigate()

    const splitLocation = pathname.split("/")

    const logout = async () => {

        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login')
        window.location.reload();

        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        // await axios.post(`${API_URL}logout`).then(res => {
        //   localStorage.removeItem('token');
        // })
      }
  return (
    <>
      {/* <!-- Navbar Start --> */}
    <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a className="text-decoration-none d-flex align-items-center" style={{ height: "65px", padding: "30px" }}>
                    <span className="h1 text-uppercase text-primary bg-dark px-2">Wan</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                </a>
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                           <Link to="/" className={`text-decoration-none nav-item nav-link ${splitLocation[1] === "" && "active"}`}>Home</Link>
                        <Link to="/shop" className={`text-decoration-none nav-item nav-link ${splitLocation[1] === "shop" && "active"}`}>Shop</Link>
                        <Link to="/contact" className={`text-decoration-none nav-item nav-link ${splitLocation[1] === "contact" && "active"}`}>Contact</Link>
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <Link to="order"  className="btn px-0 ml-3">
                                <i className="fas fa-envelope text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2" }}>{ordersByUser.length}</span>
                          </Link>
                          <Link to="cart"  className="btn px-0 ml-3">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2" }}>{cartByUser.length}</span>
                          </Link>
                          {localStorage.getItem('token') ? (
                            <>
                              <div class="btn-group">
                                <a type="button" class="dropdown-toggle px-0 ml-3 text-decoration-none" data-toggle="dropdown" aria-expanded="false">
                                    Hi, iwanekapuara
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" onClick={logout}>Logout</a>
                                </div>
                                </div>
                            </>
                          ) : (
                            <>
                            <Link to="/login" className="btn px-0 ml-3 text-primary">
                                Login
                            </Link>
                            <Link to="/register" className="btn px-0 ml-3 text-primary">
                            Register
                            </Link>
                        </>
                          )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Navbar End --> */}
    </>
  )
}

export default Navigation;