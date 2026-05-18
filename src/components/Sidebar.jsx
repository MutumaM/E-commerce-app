import './Sidebar.css'

const CATEGORIES = [
  'Phones and tablets',
  'Electronics',
  'Gaming',
  'Home Appliances',
  'Office',
  'Clothes',
]


function Sidebar(props) {
  const searchText = props.searchText
  const onSearchChange = props.onSearchChange
  const selectedCategories = props.selectedCategories
  const onCategoryChange = props.onCategoryChange

  function isChecked(category) {
    return selectedCategories.includes(category)
  }

  function handleCheckbox(category) {
    if (isChecked(category)) {
      // Remove it
      onCategoryChange(selectedCategories.filter(function (tick) {
        return tick !== category
      }))
    } else {
      // Add it
      onCategoryChange([...selectedCategories, category])
    }
  }

  return (
    <aside className="sidebar">

      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={searchText}
        onChange={function (e) {
          onSearchChange(e.target.value)
        }}
      />

      <div className="filter-section">
        <p className="filter-title">Categories</p>

        {CATEGORIES.map(function (category) {
          return (
            <label key={category} className="filter-label">
              <input
                type="checkbox"
                checked={isChecked(category)}
                onChange={function () {
                  handleCheckbox(category)
                }}
              />
              {category}
            </label>
          )
        })}
      </div>

    </aside>
  )
}

export default Sidebar
