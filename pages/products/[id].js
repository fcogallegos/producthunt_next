import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';

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

    return ( 
        <Layout>
            { error && <Error404 /> }
        </Layout> 
    );
}
 
export default Product;