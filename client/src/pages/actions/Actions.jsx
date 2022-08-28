import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/button/Button'
import Input from '../../components/input/input'



const Actions = () => {
  const {id} = useParams()
  
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    birthday: '',
  })

  const [ guestsList, setGuestList] = useState([])
  
  //  tik uzkrove puslapi parodome pirminius duomenis
  useEffect(() => {
  const fetchGuests = async () => {
  try {
  const resp = await fetch ( `${process.env.REACT_APP_SERVER_URI}attend/${Number(id)}`)
  // const resp = await fetch (`${process.env.REACT_APP_SERVER_URI}guests`)
  const data = await resp.json()
  // fullData = data;
  setGuestList(data)
  } catch (err){
  console.log(err)
  }
  }
  fetchGuests()
  
  }, [])

  const onFormSubmit = async (e) =>  {
    e.preventDefault()
try {
const response = await fetch('http://localhost:8080/api/guests',{
method: 'POST',
body:JSON.stringify(formValues),
headers: {
  'Content-Type': 'application/json',
},
// credentials:'include',
})  
const data = await response.json()
formValues.id = data.insertId;
console.log('post quests response:', data)
// setGuestList([...guestsList, formValues])

await fetch('http://localhost:8080/api/attend',{
method: 'POST',
body:JSON.stringify({
  events_id: id,
  guests_id: formValues.id
}),
headers: {
  'Content-Type': 'application/json',
},
});  

setGuestList([...guestsList, formValues])
} catch (error) {
  console.log(error)
}  
}

const onInputChange = (e, value) =>{
  setFormValues ((prevState) => ({...prevState, [value]: e.target.value}))
  console.log('on value change', value, e, guestsList)
  // setGuestList([...fullData.filter(guest => guest[value].includes(e.target.value))])
}

console.log(formValues)



const onDelete = async(id) => {
  try {
    const resp = await fetch (
      `${process.env.REACT_APP_SERVER_URI}guests/${id}`,{
      method:'DELETE'
    })
    //console.log('delete response', resp.status);
    
    if(resp.status === 200){
      setGuestList((prev)=>prev.filter(user=>user.id !==id))
    }
 
  } catch (err) {
    console.log(err)
  }
}

  return (
    <div>

    <Link to='/' >Back to Events</Link>

<h2>Event you chosed </h2>

    <form onSubmit={onFormSubmit}>
<Input type="text" 
name='name' 
placeholder='Enter Name' 
required 
onChange={(e) => onInputChange(e, 'name')}
value={formValues.name}
/>
<Input type="text" 
name='surname' 
placeholder='Enter Surname' 
required
onChange={(e) => onInputChange(e, 'surname')}
value={formValues.surname}
/>
<Input type="email"
 name='email'
  placeholder='Enter email' 
  required 
  onChange={(e) => onInputChange(e, 'email')}
value={formValues.email}
/>
<Input type="int"
 name='birthday'
  placeholder='Enter birthday' 
  required 
  onChange={(e) => onInputChange(e, 'birthday')}
value={formValues.birthday}
/>
<Button title='Register' type='submit'></Button>
    </form>
    <h3>List of attending guests</h3>

<table>
  <thead>
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Surname</th>
    <th>Email</th>
    <th>Date</th>
  </tr>
  </thead>
  <tbody>
{guestsList.map(({id, name, surname, email, birthday}) => {
  return (
    <tr key={id}>
    <td>{id}</td>
    <td>{name}</td>
    <td>{surname}</td>
    <td>{email}</td>
    <td>{birthday}</td>
    <td><Link to={`/update/${id}`}>update</Link></td>
    <td><Button onClick={()=>onDelete(id)} title={'Delete'}></Button> </td>
           </tr>)
})}
</tbody>
</table>
<button ><Link to='/update/6'>click me</Link></button>


    </div>
  )

}
export default Actions