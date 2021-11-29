import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import About from "./components/About/About";
import Delivered from "./components/Admin/AdminDelivered/Delivered";
import AdminItems from "./components/Admin/AdminItemPage/AdminItems";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import OrderDetails from "./components/Admin/AdminOrderdetails/OrderDetails";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import OpenPage from "./components/OpenPage/OpenPage";
import Welcome from "./components/Welcome/Welcome";

// import Cookies from 'universal-cookie';
import { useEffect } from "react";



// const cookies = new Cookies();

// // const authToken = cookies.get('token');

const authToken1 = JSON.parse(localStorage.getItem("token"));
console.log(authToken1);


function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          {
            authToken1 === "" || authToken1 === undifined ? <Route exact path="/" component={Welcome} ></Route> : <Route exact path="/" component={Home} ></Route>
          }
          <Route path="/login" component={Login} ></Route>
          <Route path="/home" component={Home} ></Route>
          <Route path="/about" component={About} ></Route>
          <Route path="/contact" component={Contact} ></Route>
          <Route path="/cart" component={Cart} ></Route>
          <Route path="/adminLogin" component={AdminLogin} ></Route>
          <Route path="/adminDashboard" component={AdminItems} ></Route>
          <Route path="/orderdetails" component={OrderDetails} ></Route>
          <Route path="/deliveredDetails" component={Delivered} ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
