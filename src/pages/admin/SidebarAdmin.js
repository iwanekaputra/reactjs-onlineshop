import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="sidebar-sticky pt-3">
              <ul class="nav flex-column">
                <li class="nav-item">
                  
                  <Link to={'/admin/dashboard'} class="nav-link">
                  <i class="fas fa-tachometer-alt mr-3"></i>
                    <span data-feather="home"></span>
                    Dashboard <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={'/admin/transactions'} class="nav-link">
                  <i class="fas fa-shopping-cart mr-3"></i>
                  <span data-feather="file"></span>
                    Transactions
                  </Link>
                    
                </li>
                
                <li class="nav-item">
                  <Link to={'/admin/products'} class="nav-link">
                  <i class="fas fa-shopping-bag" style={{ paddingRight : "20px" }}></i>
                    <span data-feather="shopping-cart"></span>
                    Products
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={'/admin/categories'} class="nav-link">
                  <i class="fas fa-folder mr-3"></i>
                    <span data-feather="users"></span>
                    Categories
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={'/admin/sizes'} class="nav-link">
                  <i class="fas fa-sd-card" style={{ paddingRight : "20px" }}></i>                    
                  Sizes
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={'/admin/roles'} class="nav-link">
                  <i class="fas fa-shield-alt mr-3"></i>
                    <span data-feather="bar-chart-2"></span>
                    Roles
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={'/admin/users'} class="nav-link">
                  <i class="fas fa-users" style={{ paddingRight : "12px" }}></i>
                    <span data-feather="layers"></span>
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

         
        </div>
      </div>
    </>
  )
}


export default SidebarAdmin;