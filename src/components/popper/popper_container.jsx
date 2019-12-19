import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth_actions';
import { setTheme } from '../../actions/theme_actions';
import { popperShow } from '../../actions/popper_actions';
import Popper from './popper_view';

class PopperContainer extends Component {
  ref = React.createRef();

  state = {
    isChecked: false,
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);

    this.unsubscribe = () => {
      window.removeEventListener('click', this.handleOutsideClick);  
    }

    if (this.props.colorTheme !== 'light') {
      this.setState({ isChecked: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isChecked } = this.state;

    if (isChecked !== prevState.isChecked) {
      this.props.theme(isChecked ? 'dark' : 'light');
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handlerChecked = evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    this.setState(state => {
      return {
        isChecked: !state.isChecked
      }
    });
  }

  handleOutsideClick = evt => {
    if (this.ref.current && this.ref.current.contains(evt.target)) {
      return;
    }
    
    this.props.togglePopper();
  }

  handleSignOut = () => {
    const { togglePopper } = this.props;
    
    this.props.signOut().then(togglePopper);
  }

  render() {
    const { isChecked } = this.state;
    const { onChangeFile, onCancel, logout } = this.props;

    return (
      <Popper
        isChecked={ isChecked }
        isLogout={ logout }
        nodeRef={ this.ref }
        userData={ this.props.user }
        onClickCheck={ this.handlerChecked }
        onLogout={ this.handleSignOut }
        onChangeFile={ onChangeFile }
        onCancel={ onCancel }
      />
    )
  }
}

const mapStateToProps = ({ user, theme, auth }) => {
  return {
    user: user.user,
    logout: auth.logout,
    colorTheme: theme.colorTheme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    theme: theme => dispatch(setTheme(theme)),
    togglePopper: () => dispatch(popperShow())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(PopperContainer);