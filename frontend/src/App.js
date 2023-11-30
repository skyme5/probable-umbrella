import React, { Suspense } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import ProtectedRoute from './router/ProtectedRoute';

import Layout from '#/components/Layout';
import { Listing, Login, Signup } from '#/modules';

const App = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes location={location}>
        <Route path="/" element={<Layout.Landing />}>
          <Route index element={<ProtectedRoute fallback="/login" element={<Listing />} />} />
        </Route>

        <Route path="/" element={<Layout.Landing />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
