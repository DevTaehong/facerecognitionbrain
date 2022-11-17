import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                {/* <div className='form center pa4 br3 shadow-5'> */}
                    {/* <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder='Please enter image url...'/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-pink' 
                        onClick={onPictureSubmit}
                    >
                        Detect
                    </button>
                    <img id='inputImage' alt='' src={"https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s1200d/3_Beautiful-girl-with-a-gentle-smile.jpg"} width='500px' height='auto' /> */}
                    <div class="db center tc black link">
                        <img class="db"
                            alt=""
                            src="https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s1200d/3_Beautiful-girl-with-a-gentle-smile.jpg"
                            width='500px' height='auto'
                        />
                        <div className="h2"></div>
                        <div className='center black f3'>{`Your age is between 20-29`}</div>
                        <div className="h2"></div>
                        <input className='f4 pa2 w-50 center' type='text' onChange={onInputChange} placeholder='Please enter image url...'/>
                        <button 
                        className='w-50 grow f4 link ph3 pv2 dib white bg-light-pink' 
                        onClick={onPictureSubmit}
                        >
                            Detect
                        </button>
                    </div>
                {/* </div> */}
            </div>
            
        </div>
    )
}

export default ImageLinkForm;