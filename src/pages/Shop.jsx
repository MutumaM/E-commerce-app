import { useState } from 'react'
import { useNuShop } from '../context/NushopContext'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import './Shop.css'

function Shop() {
  const { coffeeList, loading, error } = useNuShop()

  const [searchText, setSearchText] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])

  if (loading) {
    return <p className="shop-status">Loading products...</p>
  }

  if (error) {
    return <p className="shop-status">Error: {error}</p>
  }

  let coffeesToShow = coffeeList.filter(function (coffee) {
    return coffee.name.toLowerCase().includes(searchText.toLowerCase())
  })

  if (selectedLocations.length > 0) {
    coffeesToShow = coffeesToShow.filter(function (coffee) {
      return selectedLocations.includes(coffee.location)
    })
  }

  return (
    <div className="shop-page">
      <Sidebar
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedLocations={selectedLocations}
        onLocationChange={setSelectedLocations}
      />

      <section className="shop-main">
        {coffeesToShow.length === 0 ? (
          <p className="no-results">No products found</p>
        ) : (
          <div className="product-grid">
            {coffeesToShow.map(function (coffee) {
              return <ProductCard key={coffee.id} coffee={coffee} />
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Shop
