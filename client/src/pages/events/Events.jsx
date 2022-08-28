import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import LinkNav from '../../components/link/LinkNav'
import dateFormat from 'dateformat'

// dateFormat(date, "mmmm dS, yyyy") 

const Events = () => {
  // const navigate = useNavigate()
  //   saugome duomenis 
  const [ events, setEvents] = useState([])
  const [ modal, setModal] = useState(false)

   
  //  tik uzkrove puslapi parodome pirminius duomenis
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await fetch (`${process.env.REACT_APP_SERVER_URI}events`)
        const data = await resp.json()
        setEvents(data)
} catch (err){
  console.log(err)
}
}
fetchEvents()
return () => {
}
}, [])

const openModal= () => setModal(true)
const closeModal= () => setModal(false)

// add events
const onFormSubmit = async (event, values) => {
  event.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/events', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
    });
    const data = await response.json();
    console.log( 'sitas', data)
    if (!data.error) {
      values.id = data.insertId;
      setEvents((prevState) => [...prevState, values]);
      closeModal();
    }
  } catch (err) {
    console.log(err);
  }
};
console.log(modal)

console.log(events)

return (
  <div>
      {modal && <Modal onModalClose={closeModal} onFormSubmit={onFormSubmit}/>}
      <Link to ='actions'>Actions</Link>
     <h3>      List of Events    </h3>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
      {events.map(({id, name, date}) => {
        // return (<tr onClick={<Link to={`/actions/${id}`}/>}>
        //  return (<tr onClick={navigate('/actions')}> 
          return (<tr >  
          <td>{id}</td>
          <td>{name}</td>
          <td>{dateFormat(date, "dddd, mmmm dS, yyyy, h:MM")}</td>
          <td><Link  to={`/actions/${id}`}>add</Link></td>
                     </tr>)
})}
</tbody>
      </table>
      <Button title='Add Event' onClick={openModal} ></Button>

      </div>
  )
}

export default Events
