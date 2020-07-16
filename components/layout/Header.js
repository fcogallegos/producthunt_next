import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Search from '../ui/Search';
import Navegation from './Navegation';
import Button from '../ui/Button';


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
    
    &:hover {
        cursor: pointer;
    }
`;

const Header2 = styled.header`
    border-bottom: 2px solid var(--grey3);
    padding: 1rem 0;
`;

const Div = styled.div`
    display: flex;
    align-items: center;
`;

const P = styled.p`
    margin-right: 2rem;
`;

const DivLeft = styled.div`
    display: flex;
    align-items: center;
`;

const Header = () => {

    const user = false;

    return ( 
        <header>   
          <Header2>
            <ContainerHeader>
                <div>
                    <DivLeft>
                        <Link href="/">
                            <Logo>P</Logo>
                        </Link>
        
                        <Search />
        
                        <Navegation />
                    </DivLeft>                    
                </div>
                
                <div>
                    <Div>
                        { user ? (
                            <>
                                <p><P>Hi: Francisco</P></p>
                            
                                <Button 
                                    bgColor="true"
                                >Log Out</Button>
                            </>    
                        ) : (
                            <>
                                <Link href="/login">
                                <Button
                                    bgColor="true"
                                >Log In</Button>
                                </Link>
                                <Link href="/create-account">
                                    <Button>Create Account</Button>
                                </Link>
                            </>
                        ) }
                    </Div>
                </div>
            </ContainerHeader>
          </Header2>
        </header>
     );
}
 
export default Header;