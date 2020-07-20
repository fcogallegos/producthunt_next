import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

//validations
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

const STATE_INITIAL = {
  name: '',
  email: '',
  password: ''
}

const CreateAccount = () => {

  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(STATE_INITIAL, validateCreateAccount);

  const { name, email, password } = values;

  function createAccount() {
    console.log('Creating account...');
  }

  return (
  
    <div>
      <Layout>
        <>
          <H1>Create Account</H1>
          <Form 
            onSubmit={handleSubmit}
          >
              <Field>
                  <label htmlFor="name">Name</label>
                  <input 
                      type="text"
                      id="name"
                      placeholder="Your name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.name && <Error>{errors.name}</Error>}

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

              <InputSubmit 
                  type="submit"
                  value="Create Account"
              />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default CreateAccount;
