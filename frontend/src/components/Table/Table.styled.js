import styled from 'styled-components';

export const StyledTable = styled.table`
  font-size: 16px;
  border-spacing: 0;

  td,
  th {
    padding: 5px 10px;
    border-bottom: solid 1px #444;

    :not(:first-child, :last-child) {
      text-align: left;
    }
  }

  tr {
    :hover {
      cursor: default;
      background-color: #22222278;
    }
  }
`;
