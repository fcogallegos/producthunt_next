import React from 'react';
import Link from 'next/link';

const Navegation = () => {
    return ( 
        <nav>
            <Link href="/">Start</Link>
            <Link href="/">Popular</Link>
            <Link href="/">New Product</Link>
        </nav>
     );
}
 
export default Navegation;