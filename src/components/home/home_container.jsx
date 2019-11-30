import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal_actions';
import { getGalleryPhotos } from '../../actions/gallery_actions';
import AppHome from './home_view';

class HomeContainer extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { uid, getAllPhotos } = this.props;

    if (uid !== prevProps.uid) {
      getAllPhotos(uid)
    }
  }

  handleClosedModal = () => {
    this.props.toggleModal();
  }

  render() {
    const { modal } = this.props;

    return (
      <AppHome
        isOpen={ modal.isOpen }
        onClose={ this.handleClosedModal }
      />
    )
  }
}

const mapStateToProps = ({ modal, fb }) => {
  return {
    uid: fb.auth.uid,
    modal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(showModal()),
    getAllPhotos: uid => dispatch(getGalleryPhotos(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);