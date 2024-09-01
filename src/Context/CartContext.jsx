import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from './AuthContext';

export const cartContext = createContext()
const CartContextProvider = ({ children }) => {

    const [numOfItem, setnumOfItem] = useState(0)
    const [numOfProducts, setnumOfProducts] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [cartId, setCartId] = useState(0)

    const {token} = useContext(authContext)
    
    async function addToCart(productId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: productId
                }, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            );

            getUserCart()
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            });



            setnumOfItem(data.numOfCartItems)
            setnumOfProducts(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            setCartId(data.data._id)
            return data;
        } catch (error) {
            console.log(error, "getUserCart context")
        }
    }

    async function updateCount(id, count) {
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    count: count
                },
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                }
            );

            setnumOfItem(data.numOfCartItems)
            setnumOfProducts(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            setCartId(data.data._id)
            return data;
        } catch (error) {
            console.log(error, "error update count")
        }
    }

    async function deleteItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            });


            setnumOfItem(data.numOfCartItems)
            setnumOfProducts(data.data.products)
            settotalPrice(data.data.totalCartPrice)
            return data;
        } catch (error) {
            console.log(error, "error delete")
        }
    }

    async function deleteCart() {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })


            setnumOfItem(0)
            setnumOfProducts([])
            settotalPrice(0)
            setCartId(data.data._id)
            return data; 
        } catch (error) {
            console.log(error, "error delete")
        }
    }

    useEffect(function () {
        if (token != null) {
            getUserCart()
        }
    }, [token])
    

  return (
      <cartContext.Provider value={{addToCart, numOfItem, numOfProducts, totalPrice, updateCount, deleteItem, deleteCart, cartId, setnumOfItem, setnumOfProducts, settotalPrice}}>{children}</cartContext.Provider>
  )
}

export default CartContextProvider