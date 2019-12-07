import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../../actions/notification_actions';
import { modalOppened } from '../../actions/modal_actions';
import AppHome from './home';

class HomeContainer extends Component {
  modal_id = 'modal_gallery'

  componentDidUpdate(prevProps, prevState) {
    const { notification } = this.props;

    if (notification.notifi !== prevProps.notification.notifi) {
      this.pushNotification();
    }
  }

  handleClosedModal = () => {
    this.props.toggleModal();
  }

  pushNotification = () => {
    const { setNotifi } = this.props;

    setTimeout(setNotifi, 5000);
  }

  render() {
    const { notification, modal } = this.props;

    return (
      <AppHome
        onClose={ this.handleClosedModal }
        isOpen={ modal.modalId === this.modal_id }
        isModalId={ modal.modalId }
        isNotification={ notification }
      />
    )
  }
}

const mapStateToProps = ({ notification, modal }) => {
  return {
    modal,
    notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNotifi: () => dispatch(setNotification()),
    toggleModal: () => dispatch(modalOppened())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);