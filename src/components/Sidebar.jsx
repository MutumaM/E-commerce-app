import './Sidebar.css'

function Sidebar(props) {
  const searchText = props.searchText
  const onSearchChange = props.onSearchChange
  const selectedLocations = props.selectedLocations
  const onLocationChange = props.onLocationChange

  function isChecked(location) {
    return selectedLocations.includes(location)
  }

  function handleCheckbox(location) {
    if (isChecked(location)) {

      onLocationChange(selectedLocations.filter(function (loc) {
        return loc !== location
      }))
    } else {

      onLocationChange([...selectedLocations, location])
    }
  }

  const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4']

  return (
    <aside className="sidebar">

      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={searchText}
        onChange={function (e) {
          onSearchChange(e.target.value)
        }}
      />

      <div className="filter-section">
        <p className="filter-title">Filter by location</p>

        {locations.map(function (location) {
          return (
            <label key={location} className="filter-label">
              <input
                type="checkbox"
                checked={isChecked(location)}
                onChange={function () {
                  handleCheckbox(location)
                }}
              />
              {location}
            </label>
          )
        })}

      </div>
    </aside>
  )
}

export default Sidebar
