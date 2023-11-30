import styled from 'styled-components';

export const StyledContainer = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[6]}px;

  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  grid-area: header;
  max-width: 50%;
  margin: auto;
  margin-top: 150px;

  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  padding: 0 0 2.5rem;
`;

export const StyledTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const StyledInputWrapper = styled.div`
  width: 100%;

  border: solid 1px white;
  border-radius: 16px;
  overflow: hidden;

  padding: 4px 8px;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  input {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.black};
    border: none;
    outline: ${({ theme }) => theme.colors.white};
  }
`;

export const StyledInputIcon = styled.div`
  display: flex;
  align-items: center;

  svg {
    border-right: solid 1px white;
    padding-right: 8px;
    margin: 2px;
  }
`;

export const StyledInputActions = styled.div`
  display: flex;
  align-items: center;
  width: 20px;

  svg {
    cursor: pointer;
  }
`;

export const StyledSearchResultSummary = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[2]}px;

  span {
    font-weight: 600;
  }
`;

export const StyledListing = styled.div`
  border-top: 1px solid white;
`;

export const StyledListingItemsWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 60px 0;
  min-height: 300px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledNoResults = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

export const StyledPagination = styled.div`
  margin-top: auto;

  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  font-size: 18px;

  button {
    border: none;
    background: transparent;
    color: white;
    min-width: 22px;
    display: grid;
    place-items: center;

    &:hover {
      cursor: pointer;
      border-radius: 50%;
      color: black;
      background: white;
    }
  }
`;
