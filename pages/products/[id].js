import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Product = () => {
    //Routing for get the current "id"
    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {
        if(id) {
            console.log("There is an id ", id);
        }
    }, [id])

    return ( <h1>From {id}</h1> );
}
 
export default Product;