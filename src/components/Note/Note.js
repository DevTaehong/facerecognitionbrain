import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Note = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

    return (
        <div>
            {isMobile ?
                <div>
                    <p className='f7 mt1 mb0 white'>NOTE: <span className='b'>Cropped</span> face images require to work properly.</p>
                    <p className='f7 mt1 mb1 mr1 ml1 white'>* It might not work very well on small (e.g., less than 50x50) or blurry images.</p>
                </div>
                :
                <div>
                    <p className='f6 mt1 mb0 white'>NOTE: <span className='b'>Cropped</span> face images require to work properly.</p>
                    <p className='f6 mt1 mb1 white'>* It might not work very well on small (e.g., less than 50x50) or blurry images.</p>
                </div>
            }
        </div>
    )
}

export default Note;