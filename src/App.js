import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { NotFound } from "./Components/NotFound";
import { AddProducts } from "./Components/AddProducts";
import { Cart } from "./Components/Cart";
import { SellerShop } from "./Components/SellerShop";
import { Profile } from "./Components/Profile";
import { EditProduct } from "./Components/EditProduct";
import { LoginSeller } from "./Components/LoginSeller";
import { ReportGenerate } from "./Components/ReportGenerate";
import { UserReport } from "./Components/UserReport";
import { Chatbot } from "./Components/Chat";
import { InventoryReport } from "./Components/InventoryReport";
import { CartReport } from "./Components/CartReport";
import { Wardrobe } from "./Components/Wardrobe";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/login-seller" component={LoginSeller} />
        <Route path="/add-products" component={AddProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/seller-shop" component={SellerShop} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit-product/:productId" component={EditProduct} />
        <Route path="/report-dashboard" component={ReportGenerate} />
        <Route path="/user-report" component={UserReport} />
        <Route path="/chat" component={Chatbot} />
        <Route path="/invt-report" component={InventoryReport} />
        <Route path="/cart-report" component={CartReport} />
        <Route path="/wardrobe" component={Wardrobe} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
