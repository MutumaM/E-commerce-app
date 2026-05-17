function ProductCard(props) {
  const coffee = props.coffee
  const onEdit = props.onEdit
  const onDelete = props.onDelete

  const showButtons = onEdit && onDelete

  return (
    <article className="product-card">
      <h3 className="card-name">{coffee.name}</h3>
      <p className="card-desc">{coffee.description}</p>
      <p className="card-origin">Origin: {coffee.origin}</p>
      <p className="card-price">${coffee.price}</p>
      <p className="card-location">{coffee.location}</p>

      {showButtons && (
        <div className="card-actions">
          <button
            type="button"
            className="edit-btn"
            onClick={function () { onEdit(coffee) }}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={function () { onDelete(coffee.id) }}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

export default ProductCard
