import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const img_url = "http://shemtruham.alwaysdata.net/static/images/"

    const [phone, setPhone] = useState("")
    const[message, setMessage] = useState("")
    const [error, setError] = useState("")

    // function for Makepayment
    const submit = async (e) => {
        // preventing the default loading behaviour of a form
        e.preventDefault()
        // set message
        setMessage("Please wait as we process...")
        // connecting axios to flask api end point
        try {
            // attaching user inputs to data variables
            const data = new FormData()
            data.append("phone", phone)
            data.append("amount", product.product_cost)
            // posting data to the database
            const response = await axios.post("http://shemtruham.alwaysdata.net/api/mpesa_payment", data)
            // update the message
            setMessage("Please complete the payment in your phone")
        } catch (error) {
            setMessage("")
            setError(error.message)
        }
    }
  return (
    <div className='justify-content-center row mt-4'>
        <div className="col-md-6 card shadow p-4">
        <h1>Makepayment - Lipa na Mpesa</h1>
        <img src={img_url + product.product_photo} alt="" className='product_img'/>
        <p>The product name is:  {product.product_name}</p>
        <p>The product description is: {product.product_description}</p>
        <p>The product cost is: {product.product_cost}</p>
        <form action="" onSubmit={submit}>
            {message}
            {error}
            <input type="tel" placeholder='Enter phone 254XXXX' value = {phone} onChange={(e) => setPhone(e.target.value)}/>  <br /> <br />
            <button type='submit' className='btn btn-success w-50'>Make Payment</button>
        </form>
        </div>
    </div>
  )
}

export default Makepayment