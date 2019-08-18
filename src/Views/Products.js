import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Products/index";
import New from "./Products/new";
import Update from "./Products/update";

const Products = () => {
  return (
    <div className="products">
      <Switch>
        <Route path="/products" exact component={Index} />
        <Route path="/products/new" exact component={New} />
        <Route path="/products/:id" component={Update} />
      </Switch>
    </div>
  );
};

export default Products;
