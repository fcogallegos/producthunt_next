import React, { useState } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

//validations
import useValidation from '../hooks/useValidation';
import validateLogIn from '../validation/validateLogIn';


const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

const STATE_INITIAL = {
  email: '',
  password: ''
}

const Login = () => {

  const [ error, saveError ] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(STATE_INITIAL,
          validateLogIn, logIn);

  const { email, password } = values;

  async function logIn() {
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      Router.push('/');
    } catch (error) {
      console.error('There was an error to authenticate the user ', error.message);
      saveError(error.message);
    }
  }
  
  return (
  
    <div>
      <Layout>
        <>
          <H1>Log In</H1>
          <Form 
            onSubmit={handleSubmit}
            noValidate
          >
              
              <Field>
                  <label htmlFor="email">Email</label>
                  <input 
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.email && <Error>{errors.email}</Error>}

              <Field>
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password"
                      id="password"
                      placeholder="Your password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.password && <Error>{errors.password}</Error>}

              { error && <Error>{error}</Error> }

              <InputSubmit 
                  type="submit"
                  value="LOG IN"
              />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default Login;
