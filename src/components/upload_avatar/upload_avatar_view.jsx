import React from 'react';
import Popper from '../popper';
import './style.scss';

const EditorView = props => {
  const { 
    isPopperShow,
    userData,
    fileRef,
    onChange,
    onClick,
    onClickPopper,
  } = props;

  return (
    <div className="user-action">
      <button 
        type='button' 
        className='upload-file user-action-profile'
        onClick={ onClickPopper }
      >
        <img src={ userData.userAvatar } alt=""/>
      </button>
      <input 
        type="file"
        accept="image/jpeg,image/png"
        multiple={ false }
        onChange={ onChange }
        className="input-file"
        ref={ fileRef }
      />
      { isPopperShow ? <Popper onClick={ onClick } /> : null }
    </div>
  )
}

export default EditorView;