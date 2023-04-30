import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constanta";

const ListCategories = ({categories}) => {

  return (
    <>
      <button class="dropdown-toggle btn d-flex align-items-center justify-content-between bg-primary w-100" type="button" data-toggle="dropdown" aria-expanded="false" style={{ height: "65px", padding: "30px" }}>
        <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
        </button>
        <div class="dropdown-menu">
          {categories.map(category => {
            return <a class="dropdown-item" href="#">{category.title}</a>
          })}

        </div>
    </>
  )
}

export default ListCategories;