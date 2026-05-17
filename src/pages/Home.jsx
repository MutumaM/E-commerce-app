import { useNuShop } from '../context/NushopContext'
import './Home.css'

function Home() {
  const { storeInfo, loading, error } = useNuShop()

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
      <h1 className="home-title">
        Nu<span className="accent">Shop</span>
      </h1>
      <p className="home-subtitle">{storeInfo.description}</p>
      <p className="home-phone">Call us: {storeInfo.phone_number}</p>
    </div>
  )
}

export default Home
