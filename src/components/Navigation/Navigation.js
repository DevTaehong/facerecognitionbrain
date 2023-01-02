import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isMobile ?
                    <p onClick={() => onRouteChange('signout')} className="f6 link dim white pa3 pv2 mv1 pointer">Sign out</p>
                    :
                    <p onClick={() => onRouteChange('signout')} className="f3 link dim white pa3 pv2 mv1 mr3 pointer">Sign out</p>
                    }
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim white pa3 pv2 mv1 mr3 pointer">Log In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim white pa3 pv2 mv1 mr3 pointer">Sign up</p>
            </nav>
        );
    }
}

export default Navigation;