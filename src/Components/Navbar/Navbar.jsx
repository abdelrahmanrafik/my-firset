import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import "./Navbar.css";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";


const Navbar = () => {

  const { setToken, token } = useContext(authContext)
  const navigate = useNavigate()
  const {numOfItem} = useContext(cartContext)
  
  function logoutUser() {
    localStorage.removeItem("tkn")
    setToken(null)
    navigate("/")
  }

  function toCart() {
    navigate("/cart")
  }

  let location = useLocation()
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary pt-3 pb-3">
  <div class="container">
    <img src={logo} alt="" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav m-auto top">
            {token ? (<>
              <NavLink className={`linkStyle ${location.pathname === "/home" ? "active" : ""}`} to="/home">Home</NavLink>
            <NavLink className={`linkStyle ${location.pathname === "/cart" ? "active" : "" }`}  to="/cart">Cart</NavLink>
            <NavLink className={`linkStyle ${location.pathname === "/categories" ? "active" : "" }`} to="/categories">Categories</NavLink>
            <NavLink className={`linkStyle ${location.pathname === "/brands" ? "active" : "" }`} to="/brands">Brands</NavLink>
            <NavLink className={`linkStyle ${location.pathname === "/allorders" ? "active" : "" }`} to="/allorders">All Orders</NavLink>
            </>) : ("")}
          </ul>

          <div className="cartIcn">
            {token ? (<>
              <button type="button" onClick={toCart} className="btn btn-dark position-relative">
                <i className="fa-solid fa-cart-shopping text-white"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cartBadge">
                  {numOfItem}
                </span>
              </button>
            </>) : ("")}
          </div>

          {token ? (<>
            <div className="logoutBtn">
              <button className="logout" onClick={logoutUser}>Logout</button>
            </div>

          </>) :
            (<>
                  <div className="form">
        <NavLink className="linkStyle" to="/">Login</NavLink>
        <NavLink className="linkStyle" to="/Register">Register</NavLink>
      </div>  
            </>)
          }



 

    </div>

        
  </div>
</nav>
  )
}

export default Navbar