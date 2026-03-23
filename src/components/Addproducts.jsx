import React, { useState } from 'react'
import axios from 'axios'

const Addproducts = () => {
  // states for user inputs
  const [productName, setProductname] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [productPhoto, setProductPhoto] = useState("")

  // states for success, error and loading messages
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")


  // function to post user inputs in the database
  const submit = async (e) => {
    // prevent the page from reloading before the data is saved in the database
    e.preventDefault()
    setLoading("Please wait as we upload your data!")
    // sending the user inputs to the database
    try {
      const data = new FormData()
      // appending the data
      data.append("product_name", productName)
      data.append("product_description", description)
      data.append("product_cost", cost)
      data.append("product_photo", productPhoto)
      // using axios to post our data to the database
      const response = await axios.post("http://shemtruham.alwaysdata.net/api/add_product", data)
     
      // removing the loading message by setting it to empty
      setLoading("")
      // adding success message after successful data posting in the database
      setSuccess(response.data.Message)

      // clearing the form fields making the work easier for user
      setProductname("")
      setDescription("")
      setCost("")
      setProductPhoto("")

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4 bg-dark text-light">
        <h2>Add Product</h2>
        <form action="" onSubmit={submit}>
          {loading}
          {success}
          {error}
          <br />
          <label >Product Name</label><br />
          <input type="text" className='form-control' value={productName} onChange={(e) => setProductname(e.target.value)} required /><br /><br />

          <label>Description</label><br />
          <textarea name="" id="" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea><br /><br />

          <label>cost(Ksh)</label><br />
          <input type="number" className='form-control' value={cost} onChange={(e) => setCost(e.target.value)} required /><br /><br />

          <label>Product Photo</label><br />
          <input type="file" accept='image/*' className='form-control' onChange={(e) => setProductPhoto(e.target.files[0])} required />
          <br /><br />

          <button type='submit' className='btn btn-primary w-100'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addproducts