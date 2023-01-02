import React from 'react';
import { useMediaQuery } from 'react-responsive';

const DisplayName = ({ name }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

    return (
        <div>
            {isMobile ?
            <div className='f5 mb2 white'>
                {`Hello`} <div className='b dib'>{`${name}.`}</div>
                {` Try testing how old you look!`}
            </div>
            :
            <div className='f3 mb2 white'>
                {`Hello`} <div className='b dib'>{`${name}.`}</div>
                {` Try testing how old you look!`}
            </div>
            }
        </div>
    )
}

export default DisplayName;