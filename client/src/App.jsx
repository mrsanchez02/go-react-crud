import React, { useEffect, useState } from 'react'

const App = () => {

  const [name, setName] = useState("")
  const [users, setUSers] = useState([])
  
  async function loadUsers(){
    try {
      const resp = await fetch(import.meta.env.VITE_API + "/users")
      const data = await resp.json()
      setUSers(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    loadUsers()
  },[])

  const handleChange = evt => {
    setName(evt.target.value)
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (name.trim()==='') {
        return
      }
      const response = await fetch(import.meta.env.VITE_API+"/users", {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: {
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      loadUsers()
      console.log(name)
      setName("")
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Coloca tu nombre' value={name} onChange={handleChange}/>
        <button type='submit'>Save</button>
      </form>
      <ul>
        {users?.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App