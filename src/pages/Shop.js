import axios from "axios";
import { useEffect, useState } from "react"
import CardShop from "../components/CardShop"
import { API_URL } from "../utils/constanta";

const Shop = ({categories}) => {

  const [products, setProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState('all')

  useEffect(() => {
    const getProducts = async () => {
        if(productsByCategory === "all") {
            await axios.get(`${API_URL}products`).then(res => {
                setProducts(res.data.data);
              }).catch(error => {
                console.log(error)
              })

              return;
        }
            await axios.get(`${API_URL}products/category/${productsByCategory}`).then(res => {
                setProducts(res.data.data);
            }).catch(error => {
                console.log(error)
            })
    }
    getProducts()
  }, [productsByCategory])


  return (
    <>
    {/* <!-- Breadcrumb Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark">Home</a>
                    <a className="breadcrumb-item text-dark">Shop</a>
                    <span className="breadcrumb-item active">Shop List</span>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Breadcrumb End --> */}


    {/* <!-- Shop Start --> */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            {/* <!-- Shop Sidebar Start --> */}
            <div className="col-lg-3 col-md-4">
                {/* <!-- Price Start --> */}
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by category</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                            <input type="radio" className="custom-control-input" defaultChecked id="category-all" value="all" name="category" onChange={(e) => setProductsByCategory(e.target.value)}/>
                            <label className="custom-control-label" htmlFor="category-all">all</label>
                        </div>
                        {categories.map(category => {
                            return <div key={category.id} className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                            <input type="radio" className="custom-control-input" id={`category-${category.id}`} value={category.title} name="category" onChange={(e) => setProductsByCategory(e.target.value)}/>
                            <label className="custom-control-label" htmlFor={`category-${category.id}`}>{category.title}</label>
                            {/* <span className="badge border font-weight-normal">{category}</span> */}
                        </div>
                        })}
                                
                    </form>
                </div>
                {/* <!-- Price End --> */}
                
                
            </div>
            {/* <!-- Shop Sidebar End --> */}


            {/* <!-- Shop Product Start --> */}
            <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        
                    </div>
                    <CardShop products={products} />
                    <div className="col-12">
                        <nav>
                          <ul className="pagination justify-content-center">
                            <li className="page-item disabled"><a className="page-link"><span>Previous</span></a></li>
                            <li className="page-item active"><a className="page-link">1</a></li>
                            <li className="page-item"><a className="page-link">Next</a></li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Shop Product End --> */}
        </div>
    </div>
    {/* <!-- Shop End --> */}
    </>
  )
}

export default Shop