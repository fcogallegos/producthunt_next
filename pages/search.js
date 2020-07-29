import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import {  useRouter } from 'next/router';
import DetailsProduct from '../components/layout/DetailsProduct';
import useProducts from '../hooks/useProducts';



const Search = () => {

  const router = useRouter();
  const { query: {q} } = router;
  
  //all the products
  const { products } = useProducts('created');
  const [ result, saveResult] = useState([]);
  
  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter(product => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      )
    });
    saveResult(filter);
  }, [q, products])
  
  return (
    <div>
      <Layout>
        <div className="listed-products">
            <div className="container">
              <ul className="bg-white">
                { result.map(product => (
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

export default Search;
