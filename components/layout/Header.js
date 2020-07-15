import React from 'react';
import Search from '../ui/Search';
import Navegation from './Navegation';
import Link from 'next/link';

const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />

                    <Navegation />
                </div>
                
                <div>
                    <p>Hi: Francisco</p>

                    <button type="button">Log Out</button>

                    <Link href="/">Log In</Link>
                    <Link href="/">Create Account</Link>
                </div>
            </div>
        </header>
     );
}
 
export default Header;