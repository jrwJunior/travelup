import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCropPhoto, setCropZoomPhoto } from '../../actions/cropper_actions';
import { modalOppened } from '../../actions/modal_actions';
import { popperShow } from '../../actions/popper_actions';
import UploadAvatar from './upload_avatar';
import ExifOrentation from '../../utils/exif_orentation';

class UploadAvatarContainer extends Component {
  fileInput = React.createRef();
  modal_id = 'modal_cropper';

  handleChange = evt => {
    const { cropPhoto, toggleModal, cropZoomPhoto } = this.props;
    cropZoomPhoto(1);

    if (evt.target.files.length) {
      const file = evt.target.files[0];

      new ExifOrentation(file).getFile(
        window.URL.createObjectURL(file),
        url => cropPhoto(url)
      );
      toggleModal(this.modal_id);
    }
  };

  handleChangeFile = () => {
    this.fileInput.current.click();
  };

  handlePopper = evt => {
    evt.stopPropagation();
    
    this.props.togglePopper();
  }

  handleCloseModal = () => {
    this.props.toggleModal();
  }

  render() {
    const { id, popperShow, isEmpty } = this.props;

    return (
      <UploadAvatar
        userData={ this.props.user }
        isPopperShow={ popperShow }
        isOpen={ id === this.modal_id }
        isEmpty={ isEmpty }
        fileRef={ this.fileInput }
        onChange={ this.handleChange }
        onChangeFile={ this.handleChangeFile }
        onClickPopper={ this.handlePopper }
        onCloseModal={ this.handleCloseModal }
      />
    )
  }
}

const mapStateToProps = ({ user, modal, popper }) => {
  return {
    id: modal.id,
    user: user.user,
    isEmpty: user.loading,
    popperShow: popper.popperShow
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cropPhoto: url => dispatch(setCropPhoto(url)),
    cropZoomPhoto: zoom => dispatch(setCropZoomPhoto(zoom)),
    toggleModal: (id) => dispatch(modalOppened(id)),
    togglePopper: () => dispatch(popperShow())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadAvatarContainer);