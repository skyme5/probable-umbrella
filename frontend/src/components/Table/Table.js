import React from 'react';

import PropTypes from 'prop-types';

import { StyledTable } from './Table.styled';

const Table = ({ data, onSortBy }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th onClick={() => onSortBy('id')}>Id</th>
          <th onClick={() => onSortBy('name')}>Name</th>
          <th onClick={() => onSortBy('email')}>Email</th>
          <th onClick={() => onSortBy('mobile')}>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      mobile: PropTypes.string,
    })
  ).isRequired,
  onSortBy: PropTypes.func.isRequired,
};

export default Table;
