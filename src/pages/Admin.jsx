import { useState } from 'react'
import { useNuShop } from '../context/NuShopContext'
import CoffeeForm from '../components/CoffeeForm'
import ProductCard from '../components/ProductCard'
import './Admin.css'

function Admin() {
  const { coffeeList, loading, error, addCoffee, updateCoffee, deleteCoffee } = useNuShop()


  const [editingCoffee, setEditingCoffee] = useState(null)

  if (loading) {
    return <p className="admin-status">Loading...</p>
  }

  if (error) {
    return <p className="admin-status">Error: {error}</p>
  }


  function handleFormSubmit(coffeeData, editId) {
    if (editId) {
      updateCoffee(editId, coffeeData)
    } else {
      addCoffee(coffeeData)
    }
    setEditingCoffee(null)
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return

    deleteCoffee(id)

    if (editingCoffee && editingCoffee.id === id) {
      setEditingCoffee(null)
    }
  }

  return (
    <div className="admin-page">


      <CoffeeForm
        onSubmit={handleFormSubmit}
        editingCoffee={editingCoffee}
        onCancelEdit={function () { setEditingCoffee(null) }}
      />

      <section className="admin-list">
        <h2 className="admin-list-title">Manage Products</h2>
        <div className="admin-grid">
          {coffeeList.map(function (coffee) {
            return (
              <ProductCard
                key={coffee.id}
                coffee={coffee}
                onEdit={setEditingCoffee}
                onDelete={handleDelete}
              />
            )
          })}
        </div>
      </section>

    </div>
  )
}

export default Admin
