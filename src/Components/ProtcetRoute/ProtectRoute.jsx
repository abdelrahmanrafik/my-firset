import { Navigate } from "react-router-dom"


const ProtectRoute = ({children}) => {

    if (localStorage.getItem("tkn") == null) {
        return <Navigate to="/"/>
    }
  return (
    
      <>{children}</>
  )
}

export default ProtectRoute