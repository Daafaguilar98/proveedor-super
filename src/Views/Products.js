import React from "react"
import { Route } from "react-router-dom"
import Index from "./Products/index"
import New from "./Products/new"

const Products = () => {
  return (
    <div className="products">
      <Route path="/products" exact component={Index}></Route>
      <Route path="/products/new" component={New}></Route>
    </div>
  )
}

export default Products
