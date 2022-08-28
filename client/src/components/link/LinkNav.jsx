import React from 'react';
import styled from 'styled-components';


const StyledLink = styled.button`
  padding: 0.5rem 1rem;
  background-color: #b4b238;
  border: none;
  border-radius: 0.25rem;
  color: white;
  font-size: 1rem;
`;

const Button = ({ title, onClick }) => {
  return <StyledLink
   onClick={onClick}
   >{title}
   </StyledLink>;
};

export default Button;
