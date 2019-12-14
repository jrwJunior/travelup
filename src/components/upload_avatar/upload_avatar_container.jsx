import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/user_actions';
import { setCropPhoto, setCropZoomPhoto } from '../../actions/cropper_actions';
import { modalOppened } from '../../actions/modal_actions';
import { popperShow } from '../../actions/popper_actions';
import UploadAvatar from './upload_avatar';

class UploadAvatarContainer extends Component {
  fileInput = React.createRef();
  modal_id = 'modal_cropper'

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props.fb;

    if (auth.uid !== prevProps.fb.auth.uid) {
      this.props.getUserPhoto(auth.uid);
    }
  }

  handleChange = evt => {
    const { cropPhoto, toggleModal, cropZoomPhoto } = this.props;
    cropZoomPhoto(1);

    if (evt.target.files.length) {
      const file = evt.target.files[0];
      const url = window.URL.createObjectURL(file);

      toggleModal(this.modal_id);
      cropPhoto(url);
    }
  };

  handleChangeFile = () => {
    this.fileInput.current.click();

    this.props.togglePopper();
  };

  handlePopper = evt => {
    evt.stopPropagation();

    this.props.togglePopper();
  }

  handleCloseModal = () => {
    this.props.toggleModal();
  }

  render() {
    const { modal, popperShow } = this.props;

    return (
      <UploadAvatar
        userData={ this.props.user }
        isPopperShow={ popperShow }
        isOpen={ modal.modalId === this.modal_id }
        fileRef={ this.fileInput }
        onChange={ this.handleChange }
        onChangeFile={ this.handleChangeFile }
        onClickPopper={ this.handlePopper }
        onCloseModal={ this.handleCloseModal }
      />
    )
  }
}

const mapStateToProps = ({ fb, user, modal, popper }) => {
  return {
    fb,
    modal,
    user: user.currentUser,
    popperShow: popper.popperShow
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPhoto: uid => dispatch(getCurrentUser(uid)),
    cropPhoto: url => dispatch(setCropPhoto(url)),
    cropZoomPhoto: zoom => dispatch(setCropZoomPhoto(zoom)),
    toggleModal: (id) => dispatch(modalOppened(id)),
    togglePopper: () => dispatch(popperShow())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadAvatarContainer);