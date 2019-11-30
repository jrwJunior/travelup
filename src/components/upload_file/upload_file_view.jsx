import React from 'react';
import './style.scss';

const UploadFileView = props => {
  const { onChange, onClick, fileInput } = props;

  return (
    <button
      type='button'
      className='upload-photos'
      onClick={ onClick }
    >
      <span className="upload-icon" />
      <input 
        type="file" 
        multiple
        className="input-file"
        onChange={ onChange }
        ref={ fileInput }
      />
    </button>
  )
}

export default UploadFileView;