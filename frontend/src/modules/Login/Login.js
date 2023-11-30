import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { StyledContainer, StyledForm, StyledWrapper } from './Login.styled';

import WithErrorBoundary from '#/hooks/withErrorBoundary';
import { axiosClient } from '#/utils/axiosClient';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(2, 'Please enter password with minimum 2 characters')
    .max(50, 'Please enter password with maximum 2 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigate();
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (data) => axiosClient.post(`/auth/login`, data),
  });

  return (
    <StyledContainer>
      <StyledWrapper>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          validateOnChange
          onSubmit={async (values) => {
            setError(null);

            await mutation.mutate(values, {
              onSuccess: () => navigation('/', { replace: true }),
              onError: (err) => setError(err.response.data.message),
            });
          }}
        >
          {({ errors, touched }) => (
            <StyledForm>
              <label htmlFor="email">
                Email Address
                <Field name="email" type="email" />
                {errors.email && touched.email ? <span>{errors.email}</span> : null}
              </label>

              <label htmlFor="password">
                Password
                <Field name="password" type="password" />
                {errors.password && touched.password ? <span>{errors.password}</span> : null}
              </label>
              {error && <span>{error}</span>}
              <button type="button">Submit</button>
            </StyledForm>
          )}
        </Formik>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default WithErrorBoundary(Login);
