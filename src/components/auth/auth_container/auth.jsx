import React, { Component as ReactComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../../actions/auth_actions';
import { modalOppened } from '../../../actions/modal_actions';
import ReactModal from '../../modal';
import Input from '../input';
import '../style.scss';

class authContainer extends ReactComponent {
  modal_id = 'modal-error';

  state = {
    password: { showPass: false },
    confirm: { showPass: false }
  }

  handleSubmit = async(values) => {
    const { location } = this.props;

    switch(location.pathname) {
      case '/login':
        await this.props.signIn(values);
        break;
      case '/register':
        await this.props.signUp(values);
        break;
      default:
        break;
    }

    if (this.props.isLogined) {
      this.props.history.push('/');
      console.log('redirect');
    }

    if (this.props.error) {
      this.props.closeModalError(this.modal_id);
    }
  };

  handleValidate = (values, field, settings) => {
    if (!values || !values.length) {
      return 'Require field';
    }

    switch(values) {
      case field.email:
        return this.handleValidUserEmail(field.email);
      case field.password:
        if (settings.form !== 'signin') {
          return this.handleValidUserPassword(field.password);
        }
        break;
      case field.confirm:
        return this.handleValidConfirmPass(field.confirm, field.password);
      default:
        break;
    }
  }

  handleValidUserEmail = value => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regExp.test(String(value).toLowerCase())) {
      return 'Invalid email';
    }

    return undefined;
  }

  handleValidUserPassword = value => {
    const regExp = /^(?=.*[a-z])(?=.*\d).{6,}$/;

    if (value.length < 6) {
      return 'At least 6 characters';
    } else if (!regExp.test(value)) {
      return 'Password must contain letters and numbers';
    }

    return undefined;
  }

  handleValidConfirmPass = ( password, confirmPassword ) => {
    if (!confirmPassword) {
      return 'Require field';
    }

    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }

    return undefined;
  }

  handleToggleShowPassword = name => {
    this.setState(state => {
      return {
        [name]: {
          showPass: !state[name].showPass
        }
      }
    });
  }

  render() {
    const { 
      renderComponent: Component,
      location,
      isLoading,
      error,
      id,
      closeModalError
    } = this.props;

    const { pathname } = location;
    const showHide = this.state;


    return(
      <div className={ `${ pathname === '/login' ? 'unlogged-authen unlogged-login' : 'unlogged-authen unlogged-signup' }` }>
        <div className='unlogged-container'>
          <div className='unlogged-container-inner'>
            <Component
              renderProp={ props => <Input { ...props } /> }
              onSubmit={ this.handleSubmit }
              onValidate={ this.handleValidate }
              onToggleShowPassword={ this.handleToggleShowPassword }
              showHide={ showHide }
              isLoading={ isLoading }
            />
          </div>
        </div>
        <ReactModal
          isOpen={ id === this.modal_id }
          onRequestClose={ () => closeModalError() }
          className="modal modal-error"
          overlayClassName="modal-mask"
        >
          <div className='modal-content'>
            <div className='modal-error-title'>Error</div>
            <div className='error-text'>{ error }</div>
          </div>
          <button 
            className='modal-btn'
            onClick={ () => closeModalError() }
          >
            OK
          </button>
        </ReactModal>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, modal }) => {
  return {
    isLoading: auth.loading,
    error: auth.error,
    id: modal.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    signUp: creds => dispatch(signUp(creds)),
    closeModalError: id => dispatch(modalOppened(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(authContainer));
