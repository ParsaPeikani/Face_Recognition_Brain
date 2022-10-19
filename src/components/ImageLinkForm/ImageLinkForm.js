import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div >
        <p className='f3' style={{ color: 'yellow'}}>
            {'This Magic Brain will detect faces in your pictures. Give it a try'}
        </p>
        <div className='center'>
            <article className="br3 ba b--black-10 mv4 w-25-l mw6 shadow-5" style={{width: "5000px"}}>
              <main className="pa4 black-80 center">
                <input className='b pa3 input-reset ba bg-transparent w-100 yellow' type='text' onChange={onInputChange}/>
                <button 
                  className='w-30 grow f4 link ph3 pv2 dib yellow b--yellow bg-transparent'
                  onClick={onButtonSubmit}
                  >Detect</button>
              </main>
            </article>
        </div>
    </div>
  );
}

export default ImageLinkForm;