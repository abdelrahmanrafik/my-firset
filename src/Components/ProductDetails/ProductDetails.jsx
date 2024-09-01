import { useParams } from "react-router-dom"
import ex1 from "./../../assets/images/slider-image-3.jpeg"
import axios from "axios"
import { useQuery } from "react-query"
import { TailSpin } from "react-loader-spinner"
import "./ProductDetails.css"
import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"

const ProductDetails = () => {

    const { addToCart } = useContext(cartContext)
    const [loader, setLoader] = useState(false)
    
    async function addItemToCart() {
        setLoader(true)
        const data = await addToCart(id)

        if (data) {
            toast.success(data.message)
            setLoader(false)
        }
        else {
            toast.error("error")
            setLoader(false)
        }
    }


    const {id} = useParams()

    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const {data, isLoading} = useQuery(`productInfo${id}`, getProductDetails)
    
    if (isLoading) {
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
                  <div className="row d-flex flex-row justify-content-center align-items-center">
                      <div className="col-md-6">
                          <div className="text-center">
                              <img src={data?.data.data.imageCover} alt="" className="cover"/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div>
                              <h5 className="pb-2">{data?.data.data.title}</h5>
                              <h6 className="pb-2 desc">{data?.data.data.description}</h6>
                              <h6 className="pb-2 font-monospace">{data?.data.data.category.name}</h6>
                              <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                      <h5>{data?.data.data.price} EGP</h5>
                                  </div>
                                  <div>
                                      <i className="fa-solid fa-star text-warning"></i> {data?.data.data.ratingsAverage}
                                  </div>
                              </div>
                          </div>

                          <div className="pt-2">
                              <button type="button" onClick={addItemToCart} className="btn btn-success w-100 fs-5">
                                  {loader ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "+ Add to cart"}
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
      </>
  )
}

export default ProductDetails