import React from 'react';

import PropType from 'prop-types';
import { Navigate } from 'react-router-dom';

import useLocalStorage from '#/hooks/useLocalStorage';
import WithErrorBoundary from '#/hooks/withErrorBoundary';

const ProtectedRoute = ({ fallbackRoute, element, ...rest }) => {
  // Protect routes when user is logged in or when it has valid tokens
  // in the url query string. We want to protect `reset-password` route
  // when user is resetting their account password.
  const [token] = useLocalStorage('token', null);

  if (!token) {
    return (
      <Navigate
        {...rest}
        to={{
          pathname: fallbackRoute,
          // @ts-ignore
          state: { from: rest.location },
        }}
        replace
      />
    );
  }

  // Instead of returning child element we render element.
  return element;
};

ProtectedRoute.propTypes = {
  fallbackRoute: PropType.string,
  element: PropType.node,
};

ProtectedRoute.defaultProps = {
  fallbackRoute: '/login',
  element: null,
};

export default WithErrorBoundary(ProtectedRoute);
