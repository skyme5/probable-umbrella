import React, { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { StyledContainer, StyledForm, StyledWrapper } from './Signup.styled';

import WithErrorBoundary from '#/hooks/withErrorBoundary';
import { axiosClient } from '#/utils/axiosClient';

const Signup = () => {
  const navigation = useNavigate();
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (data) => axiosClient.post(`/auth/signup`, data),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobile: '',
    },
    onChange: () => setError(null),
    onSubmit: async (values) => {
      setError(null);

      await mutation.mutate(values, {
        onSuccess: () => navigation('/', { replace: true }),
        onError: (err) => setError(err.response.data.message),
      });
    },
  });

  useEffect(() => {
    setError(null);
  }, [formik.values]);

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledForm onSubmit={formik.handleSubmit}>
          <label htmlFor="name">
            Name
            <input id="name" name="name" type="name" onChange={formik.handleChange} value={formik.values.name} />
          </label>
          <label htmlFor="email">
            Email Address
            <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
          </label>
          <label htmlFor="phone">
            Phone Number
            <input
              id="mobile"
              name="mobile"
              type="tel"
              pattern="[6-9]{1}[0-9]{9}"
              onChange={formik.handleChange}
              value={formik.values.mobile}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </label>
          {error && <span>{error}</span>}
          <button type="submit">Submit</button>
        </StyledForm>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default WithErrorBoundary(Signup);
