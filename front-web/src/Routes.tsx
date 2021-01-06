import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Orders from "./Orders";

function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
          <Footer />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;