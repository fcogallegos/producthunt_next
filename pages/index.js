import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout/Layout';
import DetailsProduct from '../components/layout/DetailsProduct';
import useProducts from '../hooks/useProducts';


const Heading = styled.h1`
  color: blue;
`;

const Home = () => {

  const { products } = useProducts('created');

  return (
    <div>
      <Layout>
        <div className="listed-products">
          <div className="container">
            <ul className="bg-white">
              { products.map(product => (
                  <DetailsProduct 
                      key={product.id}
                      product={product}
                  />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
)
}

export default Home;
