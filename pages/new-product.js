import React, { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';

//validations
import useValidation from '../hooks/useValidation';
import validateCreateProduct from '../validation/validateCreateProduct';


const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;


const STATE_INITIAL = {
  name: '',
  company: '',
  //image: '',
  url: '',
  description: ''
}


const NewProduct = () => {

  const [ error, saveError ] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(STATE_INITIAL,
    validateCreateProduct, createProduct);

  const { name, company, url, description } = values;

  // the routing hook for redirect
  const router = useRouter(); 

  // Context with the CRUD operations of firebase
  const { user, firebase } = useContext(FirebaseContext);
  

  async function createProduct() {
    

      //if the user is not authenticated redirect to login
      if(!user) {
        return router.push('/login');
      }

      //create the object of new product
      const product = {
        name, 
        company,
        url,
        description,
        votes: 0,
        comments: [],
        created: Date.now()
      }

      //insert to database 
      firebase.db.collection('products').add(product);
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

            {/* <Field>
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
            { errors.image && <Error>{errors.image}</Error>} */}
              
              <Field>
                  <label htmlFor="url">URL</label>
                  <input 
                      type="url"
                      id="url"
                      name="url"
                      placeholder="URL of your Product"
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
