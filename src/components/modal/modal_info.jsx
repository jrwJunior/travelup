import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { modalOppened } from '../../actions/modal_actions';
import './style.scss';
import Logo from '../logo';

ReactModal.setAppElement('#root');

class ModalInfo extends Component {
  render() {
    return (
      <ReactModal
        isOpen={ !!this.props.body }
        { ...this.props }
      >
        <div className='modal-content'>
          { this.props.id === 'install' ? <Logo/> : null }
          <div className='modal-error-title' style={{ marginTop: this.props.id === 'install' ? '12px' : false }}>
            { this.props.id === 'install' ? 'Install Web App' : 'Error' }
          </div>
          <div className='error-text'>{ this.props.body }</div>
        </div>
        { this.props.id === 'install' ? (
            <div className='modal-footer'>Just tab then <span/> <b>Add to Home Screen</b></div>
          ) : null }
        <button 
          className='modal-btn'
          onClick={ () => this.props.onClose(undefined, null) }
        >
          OK
        </button>
      </ReactModal>
    )
  }
}

const mapStateToProps = ({ modal }) => {
  return {
    body: modal.body,
    id: modal.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: (id, body) => dispatch(modalOppened(id, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalInfo);