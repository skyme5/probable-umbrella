import React, { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Container } from './Landing.styled';

import Loader from '#/components/Loader';

const Landing = () => {
  return (
    <Suspense fallback={Loader}>
      <Container>
        <Outlet />
      </Container>
    </Suspense>
  );
};

export default Landing;
