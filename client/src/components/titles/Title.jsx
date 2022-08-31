import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  padding: 1rem 0;
  color: #aa2594;
`;

const Title = ({ title, children }) => {
  return (
    <StyledTitle>
      {title} {children}
    </StyledTitle>
  );
};

export default Title;
