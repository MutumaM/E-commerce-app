import { useState, useEffect } from 'react'
import './ProductForm.css'

const CATEGORIES = [
  'Phones and tablets',
  'Electronics',
  'Gaming',
  'Home Appliances',
  'Office',
  'Clothes',
]

function ProductForm(props) {
  const onSubmit = props.onSubmit
  const editingProduct = props.editingProduct
  const onCancelEdit = props.onCancelEdit

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  // When editingProduct changes, fill the form with its data
  useEffect(function () {
    if (editingProduct) {
      setName(editingProduct.name)
      setCategory(editingProduct.Category || 'Electronics')
      setPrice(editingProduct.price)
      setRating(editingProduct.rating)
      setImageUrl(editingProduct.image || '')
    } else {
      setName('')
      setCategory('Electronics')
      setPrice('')
      setRating('')
      setImageUrl('')
    }
    setNameError('')
    setPriceError('')
    setSubmitMessage('')
  }, [editingProduct])

  function handleSubmit(e) {
    e.preventDefault()

  
    let hasError = false
    if (name === '') {
      setNameError('Product name is required.')
      hasError = true
    }
    if (price === '') {
      setPriceError('Price is required.')
      hasError = true
    }
    if (hasError) return

    const productData = {
      name,
      Category: category,
      price: Number(price),
      rating: rating || '0',
      image: imageUrl,
    }

    const editId = editingProduct ? editingProduct.id : null
    onSubmit(productData, editId)

    // Reset
    setName('')
    setCategory('Electronics')
    setPrice('')
    setRating('')
    setImageUrl('')
    setNameError('')
    setPriceError('')
    setSubmitMessage('Saved!')

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>

      <h2 className="form-title">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      {/* Product Name */}
      <div className={nameError ? 'form-group has-error' : 'form-group'}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="e.g. Samsung A57"
          value={name}
          onChange={function (e) {
            setName(e.target.value)
            setNameError('')
          }}
        />
        {nameError && <span className="error-text">{nameError}</span>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={function (e) { setCategory(e.target.value) }}
        >
          {CATEGORIES.map(function (cat) {
            return <option key={cat} value={cat}>{cat}</option>
          })}
        </select>
      </div>

      {/* Price */}
      <div className={priceError ? 'form-group has-error' : 'form-group'}>
        <label>Price (Ksh)</label>
        <input
          type="number"
          placeholder="e.g. 45000"
          value={price}
          onChange={function (e) {
            setPrice(e.target.value)
            setPriceError('')
          }}
        />
        {priceError && <span className="error-text">{priceError}</span>}
      </div>

      {/* Rating */}
      <div className="form-group">
        <label>Rating (0–100)</label>
        <input
          type="number"
          placeholder="e.g. 85"
          min="0"
          max="100"
          value={rating}
          onChange={function (e) { setRating(e.target.value) }}
        />
      </div>

      {/* Image URL */}
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={function (e) { setImageUrl(e.target.value) }}
        />
        {/* Live preview — shows when a URL is typed */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="image-preview"
            onError={function (e) { e.target.style.display = 'none' }}
          />
        )}
      </div>

      {submitMessage && <p className="submit-message">{submitMessage}</p>}

      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {editingProduct ? 'Update' : 'Add Product'}
        </button>
        {editingProduct && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

    </form>
  )
}

export default ProductForm
