import React from 'react';
import Search from '../ui/Search';

const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />

                    { /* Nav here */ }
                </div>
                
                <div>
                    {/* Menu of administration */}
                </div>
            </div>
        </header>
     );
}
 
export default Header;