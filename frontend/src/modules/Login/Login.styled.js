import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

export const StyledWrapper = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 12px;

  padding: 2rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: black;

  min-width: 300px;

  gap: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: black;

    span {
      font-size: 12px;
      color: red;
    }
  }
`;
