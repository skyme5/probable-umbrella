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
  color: black;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  min-width: 300px;

  gap: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    font-family: ${({ theme }) => theme.fontFamily.semibold};
    font-weight: 500;

    gap: 0.5rem;

    input {
      font-family: ${({ theme }) => theme.fontFamily.regular};
    }
  }

  span {
    color: red;
  }
`;
