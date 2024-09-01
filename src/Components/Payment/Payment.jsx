import axios from "axios"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { cartContext } from './../../Context/CartContext';


const Payment = () => {

    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [details, setDetails] = useState("")

    const {cartId, setnumOfItem, setnumOfProducts, settotalPrice} = useContext(cartContext)


    async function cashPayment() {
        const x = {
            shippingAddress:{
                details,
                phone,
                city
            }
        }

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, x, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            });


            setnumOfItem(0)
            setnumOfProducts([])
            settotalPrice(0)
            toast.success(data.status)
        } catch (error) {
            toast.error("error cash payment")
        }
    }

    async function onlinePayment() {
        const x = {
            shippingAddress:{
                details,
                phone,
                city
            }
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, x , {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })

            window.open(data.session.url)
        } catch (error) {
            toast.error("Fail payment")
        }
    }

  return (
      <>
          <div className="pb-3">
              <div className="container">
                  <div className="row">
                      <div className="col">
                          <div className="pt-4">
                                <h1 className="text-success text-center fw-bold">Payment</h1>
                                <div class="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Details</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Details"  onChange={(e) => setDetails(e.target.value)}/>
                               </div>
                               <div class="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className="pt-5 text-center">
                                    <button type="button" className="btn btn-primary w-25" onClick={cashPayment}>Cash Payment</button>
                                </div>
                                <div className="pt-2 text-center">
                                    <button type="button" className="btn btn-primary w-25" onClick={onlinePayment} >Online Payment</button>
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
        </div>
      </>
  )
}

export default Payment