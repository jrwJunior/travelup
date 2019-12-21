import React from 'react';
import PropTypes from 'prop-types'

const SidebarItem = props => {
  const { 
    countName,
    countCode,
    countId,
    onSelectCountry,
    onCountVisited
  } = props;

  const falagIcon = `https://www.countryflags.io/${countCode}/shiny/64.png`;

  return (
    <div 
      className='sidebar-item'
      onClick={ () => onSelectCountry(countId) }
    >
      { onCountVisited(countId) }
      <span className='sidebar-item-label'>{ countName }</span>
      <span className='icon-flag' style={{ backgroundImage: `url(${falagIcon})` }}/>
    </div>
  )
}

SidebarItem.propTypes = {
  countName: PropTypes.string,
  countCode: PropTypes.string,
  countId: PropTypes.string,
  onSelectCountry: PropTypes.func,
  onCountVisited: PropTypes.func
}

export default SidebarItem;