import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';

const Heading = styled.h1`
  color: blue;
`;

const Home = () => {

  const [ products, saveProducts ] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  
  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('created', 'desc').onSnapshot(handleSnapshot)
    }
    getProducts();
  }, [])

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map( doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    saveProducts(products);
  }

  return (
  
    <div>
      <Layout>
        <h1>Start</h1>
      </Layout>
    </div>
  
)
}

export default Home;
