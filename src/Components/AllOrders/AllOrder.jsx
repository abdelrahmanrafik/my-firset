import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner"
import Payment from './../Payment/Payment';


const AllOrder = () => {

    const { id } = jwtDecode(localStorage.getItem("tkn"))

    const [load, setLoad] = useState(false)
    const [allOrder, setAllOrder] = useState(null)
    
    async function getAllOrders() {

        setLoad(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            
            setAllOrder(data)
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }

    useEffect(() => { getAllOrders() }, [])
    
    if (load) {
        return         <div className="loader vh-100 d-flex justify-content-center align-items-center">
        <TailSpin
    visible={true}
    height="80"
    width="80"
    color="white"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    />
    
      </div>
      }
  return (
      <>
          <div>
              <div className="container">
                  <div className="row">
                      <div className="col pt-3">
                          <h1 className="text-center text-success fw-bold">Total Orders</h1>
                          <div className="inner">
                              {allOrder ? allOrder.map((order, idx) => <div key={idx}>
                            <div className="p-3">
                                <h5>Order number: {order.id}</h5>
                                <h5>Date: {order.createdAt}</h5>
                                <h5>Total order price: {order.totalOrderPrice} EGP</h5>
                                <h5>Payment Method: {order.paymentMethodType}</h5>
                            </div>
                            <div className="pe-3 ps-3">
                              <hr />        
                            </div>     
                            </div>) : ""}
                        </div>
                    </div>
                  </div>
              </div>
        </div>
      </>
  )
}

export default AllOrder