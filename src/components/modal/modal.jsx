import React from 'react';
import ReactModal from 'react-modal';
import './style.scss';

ReactModal.setAppElement('#root');

const Modal = props => {
  return (
    <ReactModal
      { ...props }
    >
      { props.children }
    </ReactModal>
  );
}

export default Modal;