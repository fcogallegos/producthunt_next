import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { InputSubmit, Field } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const H1 = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

const H2 = styled.h2`
    margin: 2rem 0; 
`;

const Votes = styled.p`
    text-align: center;
`;

const Divotes = styled.div`
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
    const { firebase, user } = useContext(FirebaseContext);

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

    const { comments, created, description, company, name, url, urlimage, votes, creator } = product;

    //manage and validate the votes
    const voteProduct = () => {
        if (!user) {
            return router.push('/login');
        }

        //get and sum a new vote
        const newTotal = votes + 1;
        console.log(newTotal);

        // update in the DB
        firebase.db.collection('products').doc(id).update({ votes: newTotal })

        // update the state
        saveProduct({
            ...product,
            votes: newTotal
        })
    }

    return ( 
        <Layout>
            <>
                { error && <Error404 /> }

                <div className="container">
                    <H1>{name}</H1>
                

                    <ContainerProduct>
                        <div>
                            <p>Posted { formatDistanceToNow(new Date(created))} ago </p>
                            <p>Posted by: {creator.name} of {company}</p>
                            <img src={urlimage} />
                            <p>{description}</p>

                            { user && (
                                <>
                                <h2>Add your comment</h2>
                                <form>
                                    <Field>
                                        <input 
                                            type="text"
                                            name="message"
                                        />
                                    </Field>
                                    <InputSubmit 
                                        type="submit"
                                        value="Add Comment"
                                    />
                                </form>
                                </>
                            ) }

                            <H2>Comments</H2>

                            { comments.map(comment => (
                                <li>
                                    <p>{comment.name}</p>
                                    <p>Written by: {comment.userName}</p>
                                </li>
                            )) }
                        </div>

                        <aside>
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visit URL</Button>

                            <Divotes>
                                <Votes>{votes} Votes</Votes>
                                
                                { user && (
                                    <Button
                                        onClick={voteProduct}
                                    >Vote</Button>
                                ) }
                            </Divotes>
                        </aside>
                    </ContainerProduct>
                </div>
            </>
        </Layout> 
    );
}
 
export default Product;