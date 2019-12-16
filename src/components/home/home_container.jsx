import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNotice } from '../../actions/notice_actions';
import { modalOppened } from '../../actions/modal_actions';
import { getTheme } from '../../actions/theme_actions';
import { getUserData } from '../../actions/user_actions';
import AppHome from './home';

class HomeContainer extends Component {
  modal_id = 'modal_gallery';

  componentDidMount() {
    const { theme, a } = this.props;
    theme();
    a()
  }

  componentDidUpdate(prevProps, prevState) {
    const { notice, colorTheme } = this.props;
    const body = document.body;

    if (notice.isNotice !== prevProps.notice.isNotice) {
      this.pushNotice();
    }

    if (colorTheme !== prevProps.colorTheme) {
      colorTheme ? body.dataset.theme = colorTheme : body.removeAttribute('data-theme');
    }
  }

  handleClosedModal = () => {
    this.props.toggleModal();
  }

  pushNotice = () => {
    const { getNotice } = this.props;

    setTimeout(getNotice, 5000);
  }

  render() {
    const { notice, modal } = this.props;

    return (
      <AppHome
        onClose={ this.handleClosedModal }
        isOpen={ modal.modalId === this.modal_id }
        isModalId={ modal.modalId }
        isNotice={ notice }
      />
    )
  }
}

const mapStateToProps = ({ notice, modal, theme, user }) => {
  return {
    modal,
    notice,
    colorTheme: theme.colorTheme,
    uid: user.user.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    a: () => dispatch(getUserData()),
    getNotice: () => dispatch(setNotice()),
    toggleModal: () => dispatch(modalOppened()),
    theme: () => dispatch(getTheme())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);