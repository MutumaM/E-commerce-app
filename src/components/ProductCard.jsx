import './ProductCard.css'

function ProductCard(props) {
  const product = props.product
  const onEdit = props.onEdit
  const onDelete = props.onDelete

  const showButtons = onEdit && onDelete

  const formattedPrice = Number(product.price).toLocaleString()

 
  const stars = Math.round((Number(product.rating) / 100) * 5)

  return (
    <article className="product-card">

      {product.image && (
        <div className="card-img-wrap">
          <img className="card-img" src={product.image} alt={product.name} />
        </div>
      )}

      <div className="card-body">

        {/* Category tag */}
        
        <span className="card-category">{product.Category}</span>

        {/* Name */}

        <h3 className="card-name">{product.name}</h3>

        Star rating
        <div className="card-stars">
          {[1, 2, 3, 4, 5].map(function (star) {
            return (
              <span key={star} className={star <= stars ? 'star filled' : 'star'}>
                ★
              </span>
            )
          })}
          <span className="card-rating-num">{product.rating}%</span>
        </div>

        {/* Price */}
        <p className="card-price">Ksh {formattedPrice}</p>

        {/* Admin buttons */}
        {showButtons && (
          <div className="card-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={function () { onEdit(product) }}
            >
              Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={function () { onDelete(product.id) }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

    </article>
  )
}

export default ProductCard
