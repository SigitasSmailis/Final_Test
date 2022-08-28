import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/button/Button'
import Input from '../../components/input/input'
import dateFormat from 'dateformat'

const UpdateGuest = () => {
  const {id} = useParams()
  const navigate = useNavigate();
    const [guestData, setGuestData] = useState({
    name: '',
    surname: '',
    email: '',
    date: '',
  })
  //     paimamame pirminius duomenis  pagal ID
  useEffect(() => {
    const fetchGuests = async () => {
  try {
  const resp = await fetch (
    `${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`
  )
  const data = await resp.json()
  setGuestData(data)
  } catch (err){
  console.log(err)
  }
    }
  fetchGuests()
  
  }, [])

  const onFormSubmit = async (e) =>  {
    e.preventDefault()
    try {
const response = await fetch(
  `${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`,{
method: 'PATCH',
body:JSON.stringify(guestData),
headers: {
  'Content-Type': 'application/json',
},
// credentials:'include',
})  
const data = await response.json()

guestData.id = data.insertId;
navigate('/actions')
} catch (error) {
  console.log(error)
}
  }


  return (
    <div>

    <Link to='/atten' >Back to Actions</Link>
<h3>Update user</h3>

    <form onSubmit={onFormSubmit}>
<Input type="text" 
name='name' 
id='name' 

onChange={(event) =>
  setGuestData((prev) => ({ ...prev, name: event.target.value }))
}
value={guestData.name}
required
/>
<Input type="text" 
name='surname' 
// placeholder='Enter Surname' 
onChange={(event) =>
  setGuestData((prev) => ({ ...prev, surname: event.target.value }))
}
value={guestData.surname}
required
/>
<Input type="email"
 name='email'
 onChange={(event) =>
  setGuestData((prev) => ({ ...prev, email: event.target.value }))
}
value={guestData.email}
required
/>
<Input type="number"
 name='birthday'
 onChange={(event) =>
  setGuestData((prev) => ({ ...prev, birthday: event.target.value }))
}
value={guestData.birthday}
required
/>
<Button title='Update' type='submit'></Button>
    </form>

    </div>
  )

}
export default UpdateGuest