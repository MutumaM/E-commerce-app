import { useState, useEffect } from 'react'
import './CoffeeForm.css'

const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4']

function CoffeeForm(props) {
  const onSubmit = props.onSubmit
  const editingCoffee = props.editingCoffee
  const onCancelEdit = props.onCancelEdit

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('Location 1')
  const [originError, setOriginError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(function () {
    if (editingCoffee) {
      setName(editingCoffee.name)
      setDescription(editingCoffee.description)
      setOrigin(editingCoffee.origin)
      setPrice(editingCoffee.price)
      setLocation(editingCoffee.location || 'Location 1')
    } else {
      setName('')
      setDescription('')
      setOrigin('')
      setPrice('')
      setLocation('Location 1')
    }
    setOriginError('')
    setSubmitMessage('')
  }, [editingCoffee])

  function handleSubmit(e) {
    e.preventDefault()

   
    if (origin === '') {
      setOriginError('Origin is required.')
      return
    }

    const coffeeData = { name, description, origin, price, location }
    const editId = editingCoffee ? editingCoffee.id : null

    onSubmit(coffeeData, editId)


    setName('')
    setDescription('')
    setOrigin('')
    setPrice('')
    setLocation('Location 1')
    setOriginError('')
    setSubmitMessage('Saved!')

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <form className="coffee-form" onSubmit={handleSubmit}>

      <h2 className="form-title">
        {editingCoffee ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="e.g. House Blend"
          value={name}
          onChange={function (e) { setName(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Short description..."
          value={description}
          onChange={function (e) { setDescription(e.target.value) }}
        />
      </div>

      <div className={originError ? 'form-group has-error' : 'form-group'}>
        <label>Origin</label>
        <input
          type="text"
          placeholder="e.g. Ethiopia"
          value={origin}
          onChange={function (e) {
            setOrigin(e.target.value)
            setOriginError('') 
          }}
        />
        {originError && <span className="error-text">{originError}</span>}
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={function (e) { setPrice(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <select
          value={location}
          onChange={function (e) { setLocation(e.target.value) }}
        >
          {locations.map(function (loc) {
            return <option key={loc} value={loc}>{loc}</option>
          })}
        </select>
      </div>

      {submitMessage && <p className="submit-message">{submitMessage}</p>}

      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {editingCoffee ? 'Update' : 'Submit'}
        </button>
        {editingCoffee && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

    </form>
  )
}

export default CoffeeForm

