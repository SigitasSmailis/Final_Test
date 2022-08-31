import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import Title from '../../components/titles/Title';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 3rem;
`;

const EditTd = styled.td`
  padding-left: 3rem;
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_URI}events`);
        const data = await resp.json();
        setEvents(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
    return () => {};
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const onFormSubmit = async (event, values) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!data.error) {
        values.id = data.insertId;
        setEvents((prevState) => [...prevState, values]);
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {modal && <Modal onModalClose={closeModal} onFormSubmit={onFormSubmit} />}

      <Title title='List of Events'> </Title>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map(({ id, name, date }) => {
            return (
              <tr>
                <td>{id}</td>
                <EditTd>{name}</EditTd>
                <EditTd>{dateFormat(date, 'd, mmmm, yyyy, HH:MM')}</EditTd>
                <td>
                  <Link to={`/actions/${id}`}>
                    <Button title={'Add Guest'}></Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button title='Add Event' onClick={openModal}></Button>
    </Container>
  );
};

export default Events;
