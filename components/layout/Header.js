import React from 'react';
import Search from '../ui/Search';
import Navegation from './Navegation';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';


const ContainerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto; /* para que este centrado */
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {
    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--grey3);
                padding: 1rem 0;
            `}
        >
            <ContainerHeader>
                <div>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Search />

                    <Navegation />
                </div>
                
                <div>
                    <p>Hi: Francisco</p>

                    <button type="button">Log Out</button>

                    <Link href="/"><a>Log In</a></Link>
                    <Link href="/"><a>Create Account</a></Link>
                </div>
            </ContainerHeader>
            
        </header>
     );
}
 
export default Header;