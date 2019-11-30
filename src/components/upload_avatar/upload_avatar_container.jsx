import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/user_actions';
import { showModal } from '../../actions/modal_actions';
import { setCropPhoto } from '../../actions/cropper_actions';
import UploadAvatar from './upload_avatar_view';

class UploadAvatarContainer extends Component {
  fileInput = React.createRef();

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
    const { toggleModal, cropPhoto } = this.props;
    const file = evt.target.files[0];
    const url = window.URL.createObjectURL(file);

    toggleModal();
    cropPhoto(url);
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

  render() {
    const { popperShow } = this.state;

    return (
      <UploadAvatar
        userData={ this.props.user }
        isOpen={ this.props.modal.isOpen }
        isPopperShow={ popperShow }
        fileRef={ this.fileInput }
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        onClickPopper={ this.handlePopper }
        onToggleModal={ this.props.toggleModal }
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
    toggleModal: () => dispatch(showModal()),
    cropPhoto: url => dispatch(setCropPhoto(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadAvatarContainer);