import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signin = () => {
    // useState hook
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // states for loading and error
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // function to submit data to the database
  const submit = async (e) => {
    // preventing the default bahavior of the form reloading
    e.preventDefault()
    // uploading the loading message
    setLoading("Please wait as we log you in")
    // updating data into the database
    try {
      // adding user inputs to data variable
      const data = new FormData ()
      data.append ("email", email)
      data.append ("password", password)
      // connecting and posting data to the database
       const response = await axios.post("https://shemtruham.alwaysdata.net/api/signin", data)
      //  uploading the loading message to empty
      setLoading("")
      // checking if a user exist
      if (response.data.user){
        // storing the user in the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting the login user to landing page
        navigate('/')
      }
      else{
        // error for login failed
        setError(response.data.Message)
      }
    } catch (error) {
      // updating loading message to empty
      setLoading("")
      // update the error message
      setError(error.response.data.message)
    }
  }

  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4 bg-dark">
        <h2>Sign In</h2>

        <form  onSubmit={submit}>
          {loading}
          {error}

          <input type="email" placeholder="Enter Email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

          <input type="password" placeholder="Enter Password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required/><br /><br />

          <button type='submit' className='btn btn-primary w-100'>
            Sign In
          </button>

          <p>Don't have an account? <Link to="/signup" >Sign Up</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Signin