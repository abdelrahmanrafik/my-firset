import axios from "axios"
import { useQuery } from "react-query"
import { TailSpin } from 'react-loader-spinner';


const Brands = () => {

  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  const { data, isLoading } = useQuery("brand", getAllBrands)
  
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
            {data.data.data.map((brand, idx) => <>
              
              <div className="col-lg-3 col-md-6 g-3" key={idx}>
              <div className="inner p-3">
                <div>
                  <img src={brand.image} alt="" className="w-100"/>
                </div>
                <div className="text-center pt-4">
                    <h5 className="fw-bold">{brand.name}</h5>
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

export default Brands