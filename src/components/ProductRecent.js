import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/constanta";

const ProductRecent = ({products}) => {
  return (
    <>
      {/* <!-- Products Start --> */}
    <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Produk Terbaru</span></h2>
        <div className="row px-xl-5">
          {products.map(product => {
            return (
              <>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src={product.image} alt=""/>
                        </div>
                        <div className="text-center py-4">
                            <Link to={`/shop/${product.slug}`} className="h6 text-decoration-none text-truncate">{product.title}</Link>

                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>Rp. {numberWithCommas(product.price)}</h5><h6 className="text-muted ml-2"><del>{product.discount}</del></h6>
                            </div>
                        </div>
                    </div>
                </div>
              </>
            )
          })}
        </div>
    </div>
    {/* <!-- Products End --> */}
    </>
  )
}


export default ProductRecent;