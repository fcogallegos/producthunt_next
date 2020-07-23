import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import styled from '@emotion/styled';


const H1 = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

const ContainerProduct = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
   
`;

const Product = () => {

    //state of the component
    const [ product, saveProduct ] = useState({});
    const [ error, saveError ] = useState(false);

    //Routing for get the current "id"
    const router = useRouter();
    const { query: { id } } = router;

    //context of firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if(id) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists) {
                    saveProduct( product.data() );
                } else {
                    saveError( true );
                }
            }
            getProduct();
        }
    }, [id]);

    if(Object.keys(product).length === 0) return 'Loading...';

    const { comments, created, description, company, name, url, urlimage, votes } = product;
    

    return ( 
        <Layout>
            <>
                { error && <Error404 /> }

                <div className="container">
                    <H1>{name}</H1>
                

                    <ContainerProduct>
                        <div>
                            1
                        </div>
        
                        <aside>
                            2
                        </aside>
                    </ContainerProduct>
                </div>
            </>
        </Layout> 
    );
}
 
export default Product;