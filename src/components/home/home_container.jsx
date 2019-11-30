import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal_actions';
import { getGalleryPhotos } from '../../actions/gallery_actions';
import { setNotification } from '../../actions/notification_actions';
import AppHome from './home_view';

class HomeContainer extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { uid, getAllPhotos, notification } = this.props;

    if (uid !== prevProps.uid) {
      getAllPhotos(uid)
    }

    if (notification.notifi !== prevProps.notification.notifi) {
      this.addNotification();
    }
  }

  handleClosedModal = () => {
    this.props.toggleModal();
  }

  addNotification = () => {
    const { setNotifi } = this.props;

    setTimeout(setNotifi, 5000);
  }

  render() {
    const { modal, notification } = this.props;

    return (
      <AppHome
        isOpen={ modal.isOpen }
        onClose={ this.handleClosedModal }
        onA={ this.a }
        isNotification={ notification }
      />
    )
  }
}

const mapStateToProps = ({ modal, fb, notification }) => {
  return {
    uid: fb.auth.uid,
    modal,
    notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(showModal()),
    getAllPhotos: uid => dispatch(getGalleryPhotos(uid)),
    setNotifi: () => dispatch(setNotification())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);