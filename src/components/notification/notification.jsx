import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Notification = props => {
  const { notice } = props;

  if (notice.isNotice) {
    return (
      <div className='notification'>
        <div className='notification-text'>
          { notice.message }
        </div>
      </div>
    )
  }

  return null
}

Notification.propTypes = {
  notice: PropTypes.object
}

export default Notification;