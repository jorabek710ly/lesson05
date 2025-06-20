import React, { useEffect, useState } from 'react'
import { api } from '../api'

const Home = () => {
  const [data, setData] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)


  useEffect(()=>{
    setLoading(true)
    api.get("/products")
      .then(res => {
        setData(res.data)
      })
      .catch(err => setError(err))
      .finally(()=> setLoading(false))
  }, [])

  

  return (
    <div>Home
      {loading && <p>Loading...</p>}
      {
        data?.products?.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))
      }
    </div>
  )
}

export default Home