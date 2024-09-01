import axios from "axios"
import { TailSpin } from "react-loader-spinner"
import { useQuery } from "react-query"
import "./Categories.css"



const Categories = () => {

  async function getAllCat() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const {data, isLoading} = useQuery("category", getAllCat)

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
          <div className="row">
            {data.data.data.map((cat, idx) => <>
              <div className="col-lg-3 col-md-6 g-3">
              <div className="inner p-3">
                <div>
                  <img src={cat.image} alt="" className="images" />
                </div>
                <div className="text-center pt-3">
                    <h5 className="fw-bold">{cat.name}</h5>
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

export default Categories