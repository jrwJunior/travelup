import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import './style.scss';

const UploadFileView = props => {
  const { onChange, onClick, isLoading, fileInput } = props;

  return (
    <button
      type='button'
      className='upload-photos'
      onClick={ onClick }
    >
      { isLoading ? <Spinner mode='dark'/> : null }
      <span className="upload-icon" />
      <span className='upload-photos-label'>Upload file</span>
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

UploadFileView.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default UploadFileView;