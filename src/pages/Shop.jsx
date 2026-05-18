import { useState } from 'react'
import { useNuShop } from '../context/NuShopContext'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import './Shop.css'

function Shop() {
  const { products, loading, error } = useNuShop()

  const [searchText, setSearchText] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])

  if (loading) {
    return <p className="shop-status">Loading products...</p>
  }

  if (error) {
    return <p className="shop-status">Error: {error}</p>
  }


  let productsToShow = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchText.toLowerCase())
  })

 
  if (selectedCategories.length > 0) {
    productsToShow = productsToShow.filter(function (product) {
      return selectedCategories.includes(product.Category)
    })
  }

  return (
    <div className="shop-page">
      <Sidebar
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />

      <section className="shop-main">
        {productsToShow.length === 0 ? (
          <p className="no-results">No products found</p>
        ) : (
          <div className="product-grid">
            {productsToShow.map(function (product) {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Shop
