import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/input';
import Title from '../../components/titles/Title';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin: 3rem;
`;
const ButtonEdited = styled.div`
  width: fit-content;
  padding-top: 0.2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5 rem;
`;

const UpdateGuest = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [guestData, setGuestData] = useState({
    name: '',
    surname: '',
    email: '',
    birthday: '',
  });
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`
        );
        const data = await resp.json();
        setGuestData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGuests();
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(guestData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      guestData.id = data.insertId;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Link to={state?.returnUrl || '/'}>
        <Button title={'Back to Guest List'}></Button>
      </Link>
      <Title title='Update user'></Title>

      <Form onSubmit={onFormSubmit}>
        <Input
          type='text'
          name='name'
          id='name'
          onChange={(event) =>
            setGuestData((prev) => ({ ...prev, name: event.target.value }))
          }
          value={guestData.name}
          required
        />
        <Input
          type='text'
          name='surname'
          onChange={(event) =>
            setGuestData((prev) => ({ ...prev, surname: event.target.value }))
          }
          value={guestData.surname}
          required
        />
        <Input
          type='email'
          name='email'
          onChange={(event) =>
            setGuestData((prev) => ({ ...prev, email: event.target.value }))
          }
          value={guestData.email}
          required
        />
        <Input
          type='number'
          name='birthday'
          onChange={(event) =>
            setGuestData((prev) => ({
              ...prev,
              birthday: event.target.value,
            }))
          }
          value={guestData.birthday}
          required
        />
        <ButtonEdited>
          <Button title='Update' type='submit'></Button>
        </ButtonEdited>
      </Form>
    </Container>
  );
};
export default UpdateGuest;
