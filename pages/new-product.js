import React, { useState } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

//validations
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';


const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;


const STATE_INITIAL = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: ''
}


const NewProduct = () => {

  const [ error, saveError ] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(STATE_INITIAL, validateCreateAccount, createAccount);

  const { name, company, image, url, description } = values;

  async function createAccount() {
    
  }

  return (
  
    <div>
      <Layout>
        <>
          <H1>New Product</H1>
          <Form 
            onSubmit={handleSubmit}
            noValidate
          >
          <fieldset>
            <legend>General Information</legend>
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
                  <label htmlFor="company">Company</label>
                  <input 
                      type="text"
                      id="company"
                      placeholder="Company name"
                      name="company"
                      value={company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.company && <Error>{errors.company}</Error>}

              <Field>
                  <label htmlFor="image">Image</label>
                  <input 
                      type="file"
                      id="image"
                      name="image"
                      value={image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.image && <Error>{errors.image}</Error>}
              
              <Field>
                  <label htmlFor="url">URL</label>
                  <input 
                      type="url"
                      id="url"
                      name="url"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>About your Product</legend>

              <Field>
                  <label htmlFor="description">Description</label>
                  <textarea 
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Field>
              { errors.description && <Error>{errors.description}</Error>}
            </fieldset>

              { error && <Error>{error}</Error> }

              <InputSubmit 
                  type="submit"
                  value="Create Product"
              />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default NewProduct;
