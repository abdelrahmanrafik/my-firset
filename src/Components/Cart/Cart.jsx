import "./Cart.css"
import ex2 from "./../../assets/images/blog-img-1.jpeg"
import { useContext } from 'react';
import { cartContext } from './../../Context/CartContext';
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Cart = () => {

  const { numOfProducts, totalPrice, updateCount, deleteItem, deleteCart } = useContext(cartContext)
  const nav = useNavigate()


  function toPayment() {
    nav("/payment")
  }

  return (
    <>
      <div className="main pt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="inner">
                <div className="p-3 checkout">
                    <div className="d-flex flex-row justify-content-between align-items-center info1">
                      <div>
                        <h3 className="title">Cart Shop</h3>
                      </div>
                      <div className="checkoutBtn">
                          <button type="button" className="btn btn-primary" onClick={toPayment}>Checkout</button>
                        </div>
                    </div>
                    <div className="info2">
                      <div>
                      <h4>Total Price: <span className="price">{totalPrice}</span> EGP</h4>
                      </div>  
{/*                       <div>
                      <h4>Total number of items is: <span className="price">{}</span></h4>
                      </div> */}
                    </div>
                </div>

                {numOfProducts?.map((item, idx) => <>
                  <div className="p-3 allCart">
                  <div className="imgInfo w-100 gap-3">
                    <div className="imgCover">
                        <img src={item.product.imageCover} alt="" className="w-100" />
                    </div>
                    <div className="">
                      <div>
                          <h5>{item.product.title.split(" ").slice(0, 6).join(" ")}</h5>
                      </div>
                      <div>
                          <h6 className="cost">{item.price} EGP</h6>
                        </div>
                      <div>
                      <button type="button" onClick={() => deleteItem(item.product.id)} className="btn btn-danger "><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-3">
                        <div>
                          <button type="button" onClick={() => updateCount(item.product.id, item.count+1)} className="btn btn-success ">+</button>
                        </div>
                        <div>
                          <h6>{item.count}</h6>
                        </div>
                        <div>
                          <button type="button" className={`${item.count == 0 ? "disabled" : ""} btn btn-success`} onClick={() => updateCount(item.product.id, item.count-1)}>-</button>
                        </div>
                    </div>
                  </div>
                  </div>
                  
                  
                <div className=" pe-3 ps-3">
                  <hr className="hr"/>
                </div>
                
                </>)}

                <div className="text-center pb-4">
                  <button type="button" className="btn btn-warning" onClick={deleteCart}>Clear cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;