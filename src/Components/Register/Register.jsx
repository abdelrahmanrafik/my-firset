import { useFormik } from "formik"
import * as Yup from 'yup';
import "./Register.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const user = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

  async function registerUser(values) {
    
    setIsLoading(true)
    try {
      const resp = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      toast.success(resp.data.message)
      setIsLoading(false)
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false)
    }
  }
  
  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name must be min 3 chars").max(15, "Name must max 15 char"),
    email:Yup.string().required("Email is required").email("Enter valid Email"),
    password:Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{4,10}$/, "Password must start with Uppercase and contain characters % $"),
    rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref("password")], "Repassword must match with password"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Please enter Egyptian phone"),
  })

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation
  });

  return (
    <>
      <h1 className="text-center mt-4 text-success">Registeration Form</h1>
      <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter your name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger" role="alert">
          Error: {formik.errors.name}
        </div>
        ): ("")}

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


      <div className="mb-3">
        <label htmlFor="rePassword" className="form-label">Repassword</label>
        <input type="password" className="form-control" id="rePassword" placeholder="******" value={formik.values.rePassword} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
      </div>
        
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div class="alert alert-danger" role="alert">
          Error: {formik.errors.rePassword}
        </div>
      ) : ("")}

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input type="tel" className="form-control" id="phone" placeholder="0123456789" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        
        {formik.errors.phone && formik.touched.phone ? (
          <div class="alert alert-danger" role="alert">
          Error: {formik.errors.phone}
        </div>
        ): ("")}
        
        <button type="submit" className="btn btn-success">
          {isLoading == true ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Register"}
        </button>
      </form>

    
    </>

  )
}

export default Register