const DashboardAdmin = ({products, orders}) => {
  return (
    <>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
         
          <div className="row mt-3"> 
            <div className="col-md-3">
            <div class="card shadow" style={{ width: "18rem" }}>
              <div class="card-body d-flex">
                <div class="card-icon mr-4">             
                <i class="fas fa-shopping-bag" style={{ fontSize : "40px" }}></i>
                </div>
                <div class="card-icon">             

                    <div class="text-center">
                        <h4>Produk</h4>
                    </div>
                    <div class="">
                      <strong>{products.length}</strong>
                    </div>
                </div>
              </div>
              
            </div>
            </div>
            <div className="col-md-3">
            <div class="card shadow" style={{ width: "18rem" }}>
              <div class="card-body d-flex">
                <div class="card-icon mr-4">             
                <i class="fas fa-shopping-cart" style={{ fontSize : "40px" }}></i>

                </div>
                <div class="card-icon">             

                    <div class="text-center">
                        <h4>Pesanan</h4>
                    </div>
                    <div class="">
                      <strong>{orders.length}</strong>
                    </div>
                </div>
              </div>
            </div>
            </div>
            <div className="col-md-3">
            <div class="card shadow" style={{ width: "18rem" }}>
              <div class="card-body d-flex">
                <div class="card-icon mr-4">             
                <i class="fas fa-user-cog" style={{ fontSize : "40px" }}></i>
                </div>
                <div class="card-icon">             

                    <div class="text-center">
                        <h4>Admin</h4>
                    </div>
                    <div class="">
                      <strong>{products.length}</strong>
                    </div>
                </div>
              </div>
            </div>
            </div>
            <div className="col-md-3">
            <div class="card shadow" style={{ width: "18rem" }}>
              <div class="card-body d-flex">
                <div class="card-icon mr-4">             
                  <i class="fas fa-users" style={{ fontSize : "40px" }}></i>
                </div>
                <div class="card-icon">             

                    <div class="text-center">
                        <h4>Customer</h4>
                    </div>
                    <div class="">
                      <strong>{products.length}</strong>
                    </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </main>
    </>
  )
}

export default DashboardAdmin;