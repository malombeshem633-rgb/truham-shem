import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
 const[products, setProducts] = useState([])
  const[loading, setLoading] = useState("")
  const[error, setError] = useState("")
  const img_url = "http://shemtruham.alwaysdata.net/static/images/"
  const navigate = useNavigate() 

  // function to fetch products from the database
  const getproducts = async () => {
    // updating the loading message
    setLoading("Please wait, we are retrieving the products...")
    // connecting axios to flask api to fetch data from the database
    try {
      const response = await axios.get("http://shemtruham.alwaysdata.net/api/get_product_detail")
      setLoading("")
      setProducts(response.data)

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  
 useEffect (() => {
  getproducts()
 }, [])
  return (
    <div className='row'>
        <h2>Available Products</h2>
        {loading}
        {error}

        {/* maping the card to all the products */}
        {products.map((product) => (
          <div className='col-md-3 justify-content-center mb-4'>
            <div className="card shadow">
            <img src={img_url + product.product_photo} alt="" className='product_img'/>
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <p>{product.product_description}</p>
              <p>{product.product_cost}</p>
              <button className='btn btn-dark mt-2 w-100' onClick={() => navigate('/makepayment', {state: {product}})}>Purchase now</button>
            </div>
            </div>
          </div>
        )
        ) 
        }
    </div>
  )
}

export default Getproduct