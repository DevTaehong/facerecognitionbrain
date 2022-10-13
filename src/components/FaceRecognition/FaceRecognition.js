import React from 'react';
import './FaceRecognition.css';
import Tilt from 'react-parallax-tilt';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma safariZIndex'>
            <div className='absolute mt2'>
                <Tilt className="parallax-effect" perspective={500}>
                    <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                    <div 
                        className='bounding-box' 
                        style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                    >
                    </div>    
                </Tilt>            
            </div>
        </div>
    )
}

export default FaceRecognition;