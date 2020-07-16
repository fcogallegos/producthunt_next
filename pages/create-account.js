import React from 'react';
import Layout from '../components/layout/Layout';


const CreateAccount = () => (
  
    <div>
      <Layout>
        <>
          <h1>Create Account</h1>
          <form>
              <div>
                  <label htmlFor="name">Name</label>
                  <input 
                      type="text"
                      id="name"
                      placeholder="Your name"
                      name="name"
                  />
              </div>

              <div>
                  <label htmlFor="email">Email</label>
                  <input 
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      name="email"
                  />
              </div>

              <div>
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password"
                      id="password"
                      placeholder="Your password"
                      name="password"
                  />
              </div>

              <input 
                  type="submit"
                  value="Create Account"
              />
          </form>
        </>
      </Layout>
    </div>
  
)

export default CreateAccount;
