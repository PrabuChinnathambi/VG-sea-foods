import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import About from "./components/About/About";
import AdminItems from "./components/Admin/AdminItemPage/AdminItems";
import AdminHome from "./components/Admin/AdminLogin/AdminHome";
import OrderDetails from "./components/Admin/AdminOrderdetails/OrderDetails";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import OpenPage from "./components/OpenPage/OpenPage";




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} ></Route>
          {/* <Route exact path="/" component={OpenPage} ></Route> */}
          <Route path="/home" component={Home} ></Route>
          <Route path="/about" component={About} ></Route>
          <Route path="/contact" component={Contact} ></Route>
          <Route path="/cart" component={Cart} ></Route>
          <Route path="/admin" component={AdminHome} ></Route>
          <Route path="/adminItems" component={AdminItems} ></Route>
          <Route path="/orderdetails" component={OrderDetails} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
