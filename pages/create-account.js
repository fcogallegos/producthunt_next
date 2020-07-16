import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

const CreateAccount = () => (
  
    <div>
      <Layout>
        <>
          <H1>Create Account</H1>
          <Form>
              <Field>
                  <label htmlFor="name">Name</label>
                  <input 
                      type="text"
                      id="name"
                      placeholder="Your name"
                      name="name"
                  />
              </Field>

              <Field>
                  <label htmlFor="email">Email</label>
                  <input 
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      name="email"
                  />
              </Field>

              <Field>
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password"
                      id="password"
                      placeholder="Your password"
                      name="password"
                  />
              </Field>

              <InputSubmit 
                  type="submit"
                  value="Create Account"
              />
          </Form>
        </>
      </Layout>
    </div>
  
)

export default CreateAccount;
