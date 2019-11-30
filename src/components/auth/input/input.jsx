import React from 'react';
// is-error

const Input = props => {
  const { meta } = props;

  return(
    <div className='auth-field'>
      <label className='auth-label'>
        <input
          className={ `${ meta.touched && meta.invalid ? 'auth-input is-error' : 'auth-input' }` }
          { ...props.input } 
          type={ props.type } 
          placeholder={ props.placeholder }
          autoComplete='off'
        />
        { meta.touched && meta.error && <span className="text-error">{ meta.error }</span> }
        { !meta.invalid ? <span className='auth-success' /> : null }
      </label>
    </div>
  )
};

export default Input;
