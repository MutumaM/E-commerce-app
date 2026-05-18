import { createContext, useContext, useState, useEffect } from 'react'

const NuShopContext = createContext()

export function NuShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(function () {
    fetch('https://backend-e-commerce-erpl.onrender.com/api/products')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setProducts(data.products)
        console.log(data) 
        setLoading(false)
      })
      .catch(function () {
        setError('Could not load db.json')
        setLoading(false)
      })
  }, [])

  // Add a new product
  function addProduct(newProduct) {
    const lastId = products.length > 0 ? Number(products[products.length - 1].id) : 0
    const productToAdd = {
      id: String(lastId + 1),
      name: newProduct.name,
      Category: newProduct.Category,
      price: Number(newProduct.price),
      rating: newProduct.rating,
      image: newProduct.image || '',
    }
    setProducts([...products, productToAdd])
  }

  // Update an existing product
  function updateProduct(id, updates) {
    const updatedList = products.map(function (product) {
      if (product.id === id) {
        return { id: id, ...updates }
      }
      return product
    })
    setProducts(updatedList)
  }

  // Delete a product
  function deleteProduct(id) {
    setProducts(products.filter(function (product) {
      return product.id !== id
    }))
  }

  return (
    <NuShopContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </NuShopContext.Provider>
  )
}

export function useNuShop() {
  return useContext(NuShopContext)
}
