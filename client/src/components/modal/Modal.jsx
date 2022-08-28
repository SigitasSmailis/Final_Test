import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../button/Button'
import Input from '../input/input'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.7);
  z-index: 1;
  top: 0;
`
const ModalCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const StyledModal = styled.div`
display: flex;
flex-direction: column;
background-color:green;
min-height: 10rem;
min-width: 25rem;
border-radius:0.5rem;
padding: 1rem;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const StyledForm = styled.form`
display: flex;
flex-direction: column;
gap: 16px;
`

const Modal = ({onModalClose, onFormSubmit}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    date: '',
  })
  return (
    <Container>
      <ModalCont>
        <StyledModal>
        <StyledForm onSubmit={(e) => onFormSubmit(e,formValues)}>
<Input 
type="text" 
placeholder='Enter Name' 
onChange={(e) => setFormValues((prevState) =>({
  ...prevState,
   name:e.target.value,
}))
}
value={formValues.name}
required 
/>
<Input
 type="date"
  placeholder='Date of event' 
  onChange={(e) => setFormValues((prevState) =>({
    ...prevState, 
    date:e.target.value,
  }))
  }
  required 
/>
<Button title='Add Event' />
<Button title='Close' onClick={onModalClose}></Button>
    </StyledForm>
          </StyledModal>
        </ModalCont>
    </Container>
  )
}

export default Modal