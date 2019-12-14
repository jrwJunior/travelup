import React from 'react';

const shadowPassword = show => {
  if (!show) {
    return (
      <svg width='22' height='22' focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    )
  }

  return (
    <svg width='22' height='22' focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
      <path fill="none" d="m0 0h24v24H0z"/>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>
  )
}

const Input = props => {
  const { 
    input,
    meta,
    visiblePass,
    infoPass,
    showHidePassword,
    onShowPassword 
  } = props;

  return(
    <div className='unlogged-input-container'>
      <label className='unlogged-label'>
        <input
          className={ `${ meta.touched && meta.invalid ? 'unlogged-input is-error' : 'unlogged-input' }` }
          { ...input }
          type={ !!visiblePass && showHidePassword[input.name].showPass ? 'text' : props.type }
          placeholder={ props.placeholder }
          autoComplete='off'
        />
        { !!visiblePass ? (
          <button
            type='button'
            className='visually-hidden'
            onClick={ () => onShowPassword(input.name) }
          >
            { shadowPassword(showHidePassword[input.name].showPass) }
          </button>
        ) : null }
        { !!infoPass ? (
          <button 
            type='button' 
            className='tooltip-anchor' 
            data-tooltip='The password must be at least 6 characters long, contain at least 1 number and 1 letter.'
          >
            <svg width='20' height='20' focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </button>
         ) : null }
        { meta.touched && meta.error && <span className="unlogged-error" style={{ display: meta.active ? 'none' : false }}>{ meta.error }</span> }
        { !meta.invalid ? <span className='unlogged-success' /> : null }
      </label>
    </div>
  )
};

export default Input;
