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
    const { theme, getUser } = this.props;
    theme();
    getUser();
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

    setTimeout(getNotice, 3000);
  }

  render() {
    const { notice, id } = this.props;

    return (
      <AppHome
        onClose={ this.handleClosedModal }
        isOpen={ id === this.modal_id }
        isNotice={ notice }
      />
    )
  }
}

const mapStateToProps = ({ notice, modal, theme }) => {
  return {
    notice,
    id: modal.id,
    colorTheme: theme.colorTheme,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUserData()),
    getNotice: () => dispatch(setNotice()),
    toggleModal: () => dispatch(modalOppened()),
    theme: () => dispatch(getTheme())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeContainer);