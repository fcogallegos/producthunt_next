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

const LI = styled.li`
    border: 1px solid #e1e1e1;
    padding: 2rem;
`;

const SPAN = styled.span`
    font-weight: bold;
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

const CreatorProduct = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    border-radius: 4px;
`;

const Product = () => {

    //state of the component
    const [ product, saveProduct ] = useState({});
    const [ error, saveError ] = useState(false);
    const [ comment, saveComment ] = useState({});

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
    }, [id, product]);

    if(Object.keys(product).length === 0) return 'Loading...';

    const { comments, created, description, company, name, url, urlimage, votes, creator
    , voted } = product;

    //manage and validate the votes
    const voteProduct = () => {
        if (!user) {
            return router.push('/login');
        }

        //get and sum a new vote
        const newTotal = votes + 1;
        
        //verify if the user have voted
        if(voted.includes(user.uid)) return;

        //save the ID of the user that he have voted
        const newVoted = [...voted, user.uid];

        // update in the DB
        firebase.db.collection('products').doc(id).update({ 
            votes: newTotal, 
            voted: newVoted })

        // update the state
        saveProduct({
            ...product,
            votes: newTotal
        })
    }
    
    //functions for create comments
    const commentChange = e => {
        saveComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    //identify if comment is of the creator product
    const isCreator = id => {
        if(creator.id == id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();
        
        if (!user) {
            return router.push('/login');
        }

        // extra information to comment
        comment.userId = user.uid;
        comment.userName = user.displayName;

        //take a copy of comments and add to array
        const newComments = [...comments, comment];

        //update DB
        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });

        //update state
        saveProduct({
            ...product,
            comments: newComments
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
                                <form
                                    onSubmit={addComment}
                                >
                                    <Field>
                                        <input 
                                            type="text"
                                            name="message"
                                            onChange={commentChange}
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
                            { comments.length === 0 ? "There is not comments" : (
                                <ul>
                                { comments.map((comment, i) => (
                                    <LI
                                        key={`${comment.userId}-${i}`}
                                    >
                                        <p>{comment.message}</p>
                                        <p>Written by: 
                                            <SPAN>{comment.userName}</SPAN> 
                                        </p>
                                        { isCreator( comment.userId ) && <CreatorProduct>Is Creator</CreatorProduct> }
                                    </LI>
                                )) }
                                </ul>
                            ) }
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