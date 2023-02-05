import { useContext } from "react"
import ProductsContext, { UserProductsContextType } from "../context/ProductsProvider"

const useProducts = (): UserProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts