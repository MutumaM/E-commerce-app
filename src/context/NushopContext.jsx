import { createContext, useContext, useState, useEffect } from 'react'

const NuShopContext = createContext()

export function NuShopProvider({ children }) {
  const [coffeeList, setCoffeeList] = useState([])
  const [storeInfo, setStoreInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(function () {
    fetch('/db.json')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setCoffeeList(data.coffee)
        setStoreInfo(data.store_info[0])
        setLoading(false)
      })
      .catch(function () {
        setError('Could not load db.json — make sure it is in the /public folder')
        setLoading(false)
      })
  }, [])

  function addCoffee(newCoffee) {
    const lastId = coffeeList.length > 0 ? coffeeList[coffeeList.length - 1].id : 0

    const coffeeToAdd = {
      id: lastId + 1,
      name: newCoffee.name,
      description: newCoffee.description,
      origin: newCoffee.origin,
      price: newCoffee.price,
      location: newCoffee.location,
    }

    setCoffeeList([...coffeeList, coffeeToAdd])
  }

  function updateCoffee(id, updates) {
    const updatedList = coffeeList.map(function (coffee) {
      if (coffee.id === id) {
        return { id: id, ...updates }
      }
      return coffee
    })
    setCoffeeList(updatedList)
  }


  function deleteCoffee(id) {
    setCoffeeList(coffeeList.filter(function (coffee) {
      return coffee.id !== id
    }))
  }

  return (
    <NuShopContext.Provider
      value={{
        coffeeList,
        storeInfo,
        loading,
        error,
        addCoffee,
        updateCoffee,
        deleteCoffee,
      }}
    >
      {children}
    </NuShopContext.Provider>
  )
}

export function useNuShop() {
  return useContext(NuShopContext)
}
