import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/user_actions';
import { setCropPhoto } from '../../actions/cropper_actions';
import { modalOppened } from '../../actions/modal_actions';
import UploadAvatar from './upload_avatar';

class UploadAvatarContainer extends Component {
  fileInput = React.createRef();
  modal_id = 'modal_cropper'

  state = {
    popperShow: false
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props.fb;

    if (auth.uid !== prevProps.fb.auth.uid) {
      this.props.getUserPhoto(auth.uid);
    }
  }

  handleChange = evt => {
    const { cropPhoto, toggleModal } = this.props;

    if (evt.target.files.length) {
      const file = evt.target.files[0];
      const url = window.URL.createObjectURL(file);

      toggleModal(this.modal_id);
      cropPhoto(url);
    }
  };

  handleClick = () => {
    this.fileInput.current.click();
    this.setState({ popperShow: false });
  };

  handlePopper = evt => {
    evt.stopPropagation();

    this.setState(state => {
      return {
        popperShow: !state.popperShow
      }
    });
  }

  handleCloseModal = () => {
    this.props.toggleModal();
  }

  render() {
    const { popperShow } = this.state;
    const { modal } = this.props;

    return (
      <UploadAvatar
        userData={ this.props.user }
        isPopperShow={ popperShow }
        isOpen={ modal.modalId === this.modal_id }
        fileRef={ this.fileInput }
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        onClickPopper={ this.handlePopper }
        onCloseModal={ this.handleCloseModal }
      />
    )
  }
}

const mapStateToProps = ({ fb, user, modal }) => {
  return {
    fb,
    modal,
    user: user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPhoto: uid => dispatch(getCurrentUser(uid)),
    cropPhoto: url => dispatch(setCropPhoto(url)),
    toggleModal: (id) => dispatch(modalOppened(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadAvatarContainer);