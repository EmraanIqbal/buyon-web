import { useContext } from "react"
import { CartContext, UerCartContextType } from "../context/CartProvider"


const useCart = (): UerCartContextType => {
    return useContext(CartContext)
}

export default useCart