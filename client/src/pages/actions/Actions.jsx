import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/input';
import Swal from 'sweetalert2';
import Title from '../../components/titles/Title';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin: 3rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 1 rem;
`;

const ButtonEdited = styled.div`
  width: fit-content;
  padding-top: 0.2rem;
`;
const EditTd = styled.td`
  padding: 0 1rem;
  text-align: center;
`;

const Actions = () => {
  const { id: actionId } = useParams();

  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    birthday: '',
  });

  const [guestsList, setGuestList] = useState([]);
  const [event, setEvent] = useState({ name: 'no name' });

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_SERVER_URI}attend/${Number(actionId)}`
        );
        const data = await resp.json();
        setGuestList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGuests();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_SERVER_URI}events/${Number(actionId)}`
        );
        const data = await resp.json();
        setEvent(data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, [actionId]);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/guests', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200)
        throw new Error('Guest with such Email already exist');
      const data = await response.json();
      formValues.id = data.insertId;

      const attendResponse = await fetch('http://localhost:8080/api/attend', {
        method: 'POST',
        body: JSON.stringify({
          events_id: actionId,
          guests_id: formValues.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (attendResponse.status !== 200)
        throw new Error('error assigning guest to event');

      setGuestList([...guestsList, formValues]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const onInputChange = (e, value) => {
    setFormValues((prevState) => ({ ...prevState, [value]: e.target.value }));
  };

  const onDelete = async (id) => {
    try {
      const toDelete = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c34dce',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (!toDelete.isConfirmed) return;

      const resp = await fetch(
        `${process.env.REACT_APP_SERVER_URI}guests/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (resp.status === 200) {
        setGuestList((prev) => prev.filter((user) => user.id !== id));
        await Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Link to='/'>
        <Button title={'Back to Events'}></Button>
      </Link>

      <Form onSubmit={onFormSubmit}>
        <Input
          type='text'
          name='name'
          placeholder='Enter Name'
          required
          onChange={(e) => onInputChange(e, 'name')}
          value={formValues.name}
        />
        <Input
          type='text'
          name='surname'
          placeholder='Enter Surname'
          required
          onChange={(e) => onInputChange(e, 'surname')}
          value={formValues.surname}
        />
        <Input
          type='email'
          name='email'
          placeholder='Enter email'
          required
          onChange={(e) => onInputChange(e, 'email')}
          value={formValues.email}
        />
        <Input
          type='int'
          name='birthday'
          placeholder='Enter birthday'
          required
          onChange={(e) => onInputChange(e, 'birthday')}
          value={formValues.birthday}
        />
        <ButtonEdited>
          <Button title='Register' type='submit'></Button>
        </ButtonEdited>
      </Form>

      <Title> {event.name} </Title>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {guestsList.map(({ id, name, surname, email, birthday }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <EditTd>{name}</EditTd>
                <EditTd>{surname}</EditTd>
                <EditTd>{email}</EditTd>
                <EditTd>{birthday}</EditTd>
                <td>
                  <Link
                    to={`/update/${id}`}
                    state={{ returnUrl: `/actions/${actionId}` }}
                  >
                    <Button title={'Update'}></Button>
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => onDelete(id)}
                    title={'Delete'}
                  ></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};
export default Actions;
