import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner"
import "./Home.css"
import { useQuery } from "react-query"
import HomeSlider from "../HomeSlider/HomeSlider"
import CatSlider from "../CatSlider/CatSlider"
import { Link } from "react-router-dom"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"


const Home = () => {

  const { addToCart } = useContext(cartContext)

  async function addItemToCart(id) {
    const data = await addToCart(id)

    if (data) {
      toast.success(data.message)
    }
    else {
      toast.error("error")
    }
}

/*   const [allProducts, setAllProducts]= useState(null) */

async function getAllProducts() {

  return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      
    /*       setAllProducts(data.data) */
}

  const {data, isLoading, isFetching, error} = useQuery("product", getAllProducts)

/*   useEffect(function () {
    getAllProducts()
  }, []) */

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
          <div className="pt-5">
        <div className="container">
          <div className="row g-4">
            <HomeSlider />
            <CatSlider/>
              {data.data.data.map((item, idx) => <>
              
                <div className="col-lg-3 col-md-6" key={idx}>
                  <div className="inner p-2">
                  <Link to={`/productDetails/${item.id}`} className="link">
                    <img src={item.imageCover} alt="img" className="w-100 pb-2 img"/>
                    <h6 className="cat">{item.category.name}</h6>
                    <h5 className="title">{item.title.split(" ").slice(0, 2).join(" ")}</h5>
      
                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <h6>{item.price} EGP</h6>
                      </div>
      
                      <div>
                        <i className="fa-solid fa-star text-warning"></i> {item.ratingsAverage}
                      </div>
                    </div>
                    </Link>


                    <div className="text-center pt-2">
                      <button type="button" className="btn btn-success mb-2" onClick={() => addItemToCart(item.id)}>Add to Cart</button>
                    </div>
                  </div>

                </div>
              
              </>)}
              </div>
            </div>
          </div>
    </>
  )
}

export default Home