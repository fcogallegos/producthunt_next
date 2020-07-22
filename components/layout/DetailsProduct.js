import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const DetailsProduct = ({product}) => {
    
    const { id, comments, created, description, company, name, url, urlimage, votes } = product;
    

    return ( 
        <li>
            <div>
                <div>
                    <img src={urlimage} />
                </div>
                <div>
                    <h1>{name}</h1>

                    <p>{description}</p>

                    <div>
                        <img src="/static/img/comentario.png" />
                        <p>{comments.length} Comments</p>

                        <p>Posted { formatDistanceToNow(new Date(created))} ago </p>
                    </div>
                </div>
            </div>

            <div>
                <div> &#9650; </div>
                <p>{votes}</p>
            </div>
        </li>

        
     );
}
 
export default DetailsProduct;