import React from 'react';

import './FaceRecognition.styles.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                <div>
                    {boxes}
                </div>
            </div>
            
        </div>
    );
}

export default FaceRecognition;