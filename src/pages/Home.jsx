import { useNuShop } from '../context/NuShopContext'
import { NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
  const { products, loading, error } = useNuShop()

  if (loading) {
    return (
      <div className="home-page">
        <p className="status-msg">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-page">
        <p className="status-msg error-msg">{error}</p>
      </div>
    )
  }


  return (
    <div className="home-page">

      <div className="home-hero">
        <h1 className="home-title">
          Nu<span className="accent">Shop</span>
        </h1>
        <p className="home-subtitle">
          NuShop curates products that actually last — no filler, no noise, no decision fatigue.
        </p>
        <NavLink to="/shop" className="home-cta-btn">
          Browse Products
        </NavLink>
      </div>

    </div>
  )
}

export default Home
