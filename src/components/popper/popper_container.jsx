import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth_actions';
import Popper from './popper_view';

class PopperContainer extends Component {
  ref = React.createRef();

  state = {
    isChecked: false,
  }

  handlerChecked = evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }
    
    this.setState(state => {
      return {
        isChecked: !state.isChecked
      }
    })
  }

  render() {
    const { isChecked } = this.state;
    return (
      <Popper
        isChecked={ isChecked }
        nodeRef={ this.ref }
        userData={ this.props.user }
        onClickCheck={ this.handlerChecked }
        onLogout={ this.props.signOut }
        onClick={ this.props.onClick }
      />
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(PopperContainer);