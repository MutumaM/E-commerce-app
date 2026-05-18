import { useState } from 'react'
import { useNuShop } from '../context/NuShopContext'
import ProductForm from '../components/ProductForm'
import ProductCard from '../components/ProductCard'
import './Admin.css'

function Admin() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useNuShop()

 
  const [editingProduct, setEditingProduct] = useState(null)

  if (loading) {
    return <p className="admin-status">Loading...</p>
  }

  if (error) {
    return <p className="admin-status">Error: {error}</p>
  }

  function handleFormSubmit(productData, editId) {
    if (editId) {
      updateProduct(editId, productData)
    } else {
      addProduct(productData)
    }
    setEditingProduct(null)
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return

    deleteProduct(id)


    if (editingProduct && editingProduct.id === id) {
      setEditingProduct(null)
    }
  }

  return (
    <div className="admin-page">

      <ProductForm
        onSubmit={handleFormSubmit}
        editingProduct={editingProduct}
        onCancelEdit={function () { setEditingProduct(null) }}
      />

      <section className="admin-list">
        <h2 className="admin-list-title">Manage Products ({products.length})</h2>
        <div className="admin-grid">
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProduct}
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

