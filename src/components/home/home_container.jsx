import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGalleryPhotos } from '../../actions/gallery_actions';
import { setNotification } from '../../actions/notification_actions';
import { modalOppened } from '../../actions/modal_actions';
import AppHome from './home';

class HomeContainer extends Component {
  modal_id = 'modal_gallery'

  componentDidUpdate(prevProps, prevState) {
    const { uid, getAllPhotos, notification } = this.props;

    if (uid !== prevProps.uid) {
      getAllPhotos(uid)
    }

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

const mapStateToProps = ({ fb, notification, modal }) => {
  return {
    uid: fb.auth.uid,
    modal,
    notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPhotos: uid => dispatch(getGalleryPhotos(uid)),
    setNotifi: () => dispatch(setNotification()),
    toggleModal: () => dispatch(modalOppened())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);