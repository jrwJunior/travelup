import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Popper from '../popper';
import ReactModal from 'react-modal';
import Cropper from '../cropper';
import './style.scss';

const EditorView = props => {
  const { 
    isPopperShow,
    userData,
    isOpen,
    isEmpty,
    fileRef,
    popperRef,
    onChange,
    onChangeFile,
    onClickPopper,
    onCloseModal
  } = props;

  if (isEmpty) {
    return (
      <div className='sekeletonbox-avatar'/>
    )
  }

  return (
    <div className="user-action">
      <button 
        type='button' 
        className='upload-file user-action-profile'
        onClick={ onClickPopper }
      >
        <img src={ userData.userAvatar } alt="user-avatar"/>
      </button>
      <input 
        type="file"
        accept="image/jpeg,image/png"
        multiple={ false }
        onChange={ onChange }
        className="input-file"
        ref={ fileRef }
      />
      <CSSTransition
        in={ isPopperShow }
        timeout={ 350 }
        classNames='dropdown'
        unmountOnExit
      >
        <Popper 
          onChangeFile={ onChangeFile }
          onCancel={ onClickPopper }
          popperRef={ popperRef }
          { ...props }
        />
      </CSSTransition>
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