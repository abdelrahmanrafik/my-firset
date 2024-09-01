import { useFormik } from "formik"
import * as Yup from 'yup';
import axios from "axios";
import "./../Register/Register.css"
import "./Login.css"
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";


const Login = () => {

  const {setToken}= useContext(authContext)

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  let user = {
    email:"",
    password:"",
  }

  async function loginUser(values) {
    
    setIsLoading(true)
    try {
      const resp = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      toast.success(resp.data.message)
      setIsLoading(false)
      navigate("/home")
      setToken(resp.data.token)
      localStorage.setItem("tkn", resp.data.token)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  
  const validation = Yup.object().shape({ 
    email:Yup.string().required("Email is required").email("Enter valid Email"),
    password:Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{4,10}$/, "Password must start with Uppercase and contain characters % $"),
  })

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation
  });

  return (
    <>
      <h1 className="text-center mt-4 text-success">Login</h1>
      <form onSubmit={formik.handleSubmit} >

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        
        {formik.errors.email && formik.touched.email ? (
          <div class="alert alert-danger" role="alert">
          Error: {formik.errors.email}
        </div>
        ) : ("")}

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" placeholder="******" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        
        {formik.errors.password && formik.touched.password ? (
          <div class="alert alert-danger" role="alert">
          Error: {formik.errors.password}
        </div>
        ) : ("")}
        
        <NavLink className="link pb-1" to="/register">No account? <span>Register now</span></NavLink>
        
        <button type="submit" className="btn btn-success">
          {isLoading == true ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Login"}
        </button>
      </form>

    
    </>

  )
}

export default Login