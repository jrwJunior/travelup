import React from 'react';
import Popper from '../popper';
import ReactModal from '../modal';
import Cropper from '../cropper';
import './style.scss';

const EditorView = props => {
  const { 
    isPopperShow,
    userData,
    isOpen,
    fileRef,
    popperRef,
    onChange,
    onChangeFile,
    onClickPopper,
    onCloseModal
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
      { isPopperShow ? (
        <Popper 
          onChangeFile={ onChangeFile }
          onCancel={ onClickPopper }
          popperRef={ popperRef }
        />
      ) : null }
      <ReactModal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        className="modal modal-cropper"
        overlayClassName="modal-mask"
      >
        <Cropper/>
      </ReactModal>
    </div>
  )
}

export default EditorView;