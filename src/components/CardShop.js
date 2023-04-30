import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/constanta";

const CardShop = ({products}) => {
  return (
    <>
    {products?.map((product, index) => {
      return <div key={index} className="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={product.image} alt=""/>
            </div>
            <div className="text-center py-4">
                <Link className="text-decoration-none" to={`/shop/${product.slug}`}>{product.title}</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>Rp. {numberWithCommas(product.price)}</h5><h6 className="text-muted ml-2"><del>{product.discount}</del></h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small>(99)</small>
                </div>
            </div>
        </div>
      </div>
    })}
    </>
  )
}

export default CardShop