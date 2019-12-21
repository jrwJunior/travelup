import React from 'react';
import './style.scss';

const Spinner = ({ mode = 'white', width, height }) => {
  return(
    <div 
      className={ `spinner ${ mode }` }
      style={{ width, height }}
    >
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 51.6 51.6"
        style={{
          width: "56px",
          height: "56px"
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="23"
          className="ng-star-inserted"
          style={{
            animationName: "mat-progress-spinner-stroke-rotate-56",
            strokeDasharray: "144.513px",
            strokeWidth: "10%"
          }}
        />
      </svg>
    </div>
  )
};

export default Spinner;
